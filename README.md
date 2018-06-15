Crossroads Media
==========

Media site for Crossroads.

Project-Specific Functionality
----------

The following sections outline behavior, features, and processes specific to this project:

### Images

With the help of imgix, we are using two strategies to increase performance while rendering images:

- Pixellated placeholders
- `srcset` and `sizes` attributes

It works like this:

1. Images are pixellated (but proportional to their desired result) on page load.
2. The `images.js` script processes all images with the `data-optimize-img` attribute.
3. At the time of processing, the source of the image is converted to the properly sizes image by setting the `ix-src` attribute and then re-initializing `imgix.js`.
4. From there the browser takes over and chooses the correct source from the combination of the `srcset` attribute (set by `imgix.js` during processing) and the `sizes` attribute (set manually, see below for more info).

_Note: If the desired full-size imgix parameters are different than those of the placeholder, you may optionally use a `ix-params` attribute. However, if styled correctly, this should not be necessary._

We build the source by taking the original source, adding an imgix replacement filter and then the proper placeholder parameters. The available parameters can be seen in the `_config.yml` file.

Sizes are also available in the config file to make the markup a little cleaner.

#### Example

Here is an example of markup:

```html
<img src="{{ page.image | imgix: site.imgix }}?{{ site.imgix_params.placeholder }}" sizes="{{ site.image_sizes.full_width }}" data-optimize-img>
```

This would translate to something like the following (before processing):

```html
<img src="//crds-media-int.imgix.net/5G62zla1zOsmKqSo8wmomI/d46b0ec8a96339c72f25b56b7c2dd99b/isle-of-skye.jpg?auto=format,compress&w=10" sizes="100vw" data-optimize-img>
```

#### Background Images

Background images work similarly, with three exceptions:

- A `data-optimize-bg-img` attribute is required for the processing.
- The dimensions of the imgix image are set automatically based on the container (i.e. it assumes a _cover_ background approach).
- The script watches for changes to the size of the window and will update the background image appropriately.

### CSS

We're using [PurgeCSS](https://www.purgecss.com/) to optimize our CSS file. This has enabled us to reduce the main CSS file by 90-95%, which has increased performance significantly.

PurgeCSS is run immediately following a build. This replaces the main CSS file with the optimized version.

_GOTCHA!_ PurgeCSS can only target the markup that gets generated during the build. This means that if you don't see a class selector in the output CSS file, you may have to add it to the whitelist. But note, if you're developing, try restarting your server before adding a selector to the whitelist.

To add a class to the whitelist, add it to the `whitelist:` option in `_plugins/purgecss.rb`.

### Frontmatter

The following is a list of custom options for frontmatter arguments beyond what Jekyll offers.

| Name | Default | Description |
| ---- | ---- | ---- |
| `js_manifest` | `application_deferred` | The main JavaScript manifest file to load on the current page. **Do not include `.js` extension on the name.** |
| `js_vars` | `nil` | An array of local environment variables to load as global JavaScript variables. **The names of env vars will match JS vars exactly.** |
| `preloader` | `nil` | If truthy, it will render a preloading spinner on the page. |

### Pagination

You can paginate one or more collections, on a per-page basis, by defining a `paginate` object in template front-matter. In the following example, the `articles` collection will be reduced to multiple pages containing `8` or fewer document instances and exposed to the template via the `page.articles` variable...

```liquid
---
...
paginate:
  articles:
    per: 8
---

{% for doc in page.articles.docs %}
  ...
{% endfor %}

{% include _pagination.html collection="articles" %}
```

The pages will be generated dynamically according to the name of the template. For example, if the file described in the example above was named `articles.html` &mdash; the paths for the generated pages would resolve to `/articles/page/2`, `/articles/page/3`, etc.

#### Offsetting Collections

You can abstract the first `n` items from your paginated collection by defining an `offset` number. This is helpful if you'd like to expose a certain number of "featured" entries on the landing page of your collection. For example...

```liquid
---
...
paginate:
  articles:
    offset: 3
    per: 8
---

{{ page.articles.offset }} // the first 3 items

{{ page.articles.docs }} // the rest of paginated collection, sans the first 3 items
```

#### Asyncronous Page Loading

You can implement an async 'load more' interaction automatically by ensuring your template contains the following concerns. Note, this approach will hide the static pagination elements from the user and present a link that will dynamically append the next page's worth of items on each click.

```liquid
<div data-page="songs">
  <div data-page-number="{{ page.songs.page }}">
    {% for song in page.songs.docs %}
      ...
    {% endfor %}
  </div>
  <div class="loading hide">
    {% include _preloader.html %}
  </div>
</div>
{% include _pagination.html collection="songs" remote=true %}
```

#### Filtering Collections

By adding a series of `where` arguments, you can obtain a filtered collection (i.e. a _subset_ of the Jekyll collection).

This works by using the `where` option within your pagination config and providing a series of key-value pairs where the key is the name of the attribute within the collection objects and the value is what that attribute must equal (or _contain_, more on that below).

For example, if you'd like to only show articles where the title of the article is "My Title" you could do this:

```liquid
---
...
paginate:
  articles:
    per: 8
    where:
      title: "My Title"
---
```

You can add more that one filter argument, but the paginator will treat these as AND conditions, meaning both conditions must be true for the document to be presented in the collection.

```liquid
---
...
paginate:
  articles:
    per: 8
    where:
      title: "My Title"
      subtitle: "My Subtitle"
---
```

Filtering also supports dynamic values. Inspired by [ruby symbols](https://ruby-doc.org/core-2.2.0/Symbol.html), any value with a leading colon will look for that value in the data object of **the page** that is rendering the collection. For example:

```liquid
---
...
title: "Hello World"
paginate:
  articles:
    per: 8
    where:
      subtitle: :title
---
```

In this example, the only articles that would be returned in the collection would be those where their subtitle matched the title of the page rendering the collection (i.e. "Hello World").

Finally, filtering supports array fields and looks for only a single match. The paginator does this automatically. Let's say your articles have tags via a `tags` field. And the current tag is the title of the page rendering the collection. You could do something like this:

```liquid
---
...
paginate:
  articles:
    per: 8
    where:
      tags: :title
---
```

In this case, only those articles containing at least one tag matching the title of the page rendering the collection would be returned.

#### Sorting Collections

In the absence of filtering, pagination takes the collection as presented by Jekyll. You can optionally add a `sort` option to choose a data parameter to use to sort the collection. The first string is the method by which you'd like to sort and the second is the sorting direction (`asc`/`desc`). The direction is optional.

For example, if you wanted to sort articles in reverse chronological order, that might look something like this:

```liquid
---
...
paginate:
  articles:
    per: 8
    sort: date desc
---
```

But if you wanted to sort articles by title, that can look like this:

```liquid
---
...
paginate:
  articles:
    per: 8
    sort: title
---
```

#### Limiting Number of Pages Created

You can limit the first `n` pages from your paginated collection by defining a `limit` number. This is helpful if you'd like to show the first `n` pages without generating pages for the entire collection such as on the homepage. On the homepage we want the simplicity of the paginate gem, but we don't want to create additional pages for each content type nor show pagination for articles, podcasts, songs, videos, etc.

For example, if you only want to show the first 8 most recent items of articles, and not show additional pages:

```liquid
---
...
paginate:
  articles:
    per: 8
    limit: 1
---
```

Testing
----------

This project uses [RSpec](http://rspec.info/) as its test runner. You can run the test suite with RSpec's command-line utility:

    $ bundle exec rspec

At the moment, all specs reside in the individual gems created in the `vendor` directory. To run these specs, pass the directory to the end of the line:

    $ bundle exec rspec vendor

### Scaffolding A Site

The scaffolding functionality can be found in `spec/support/jekyll_helpers.rb`. It can be invoked in your specs like so:

```rb
@site = JekyllHelpers.scaffold(options)
```

There are several options you can use to manipulate the site returned to you for use in your spec:

| Name | Default | Description |
| ---- | ---- | ---- |
| `base_path` | crds-media root directory | The main directory from which other options are derived. (Other options can still be overridden individually.) |
| `collections_dir` | `"#{base_path}/collections"` | Directory in which to look for collection docs. (This is how you can create fixtures without getting in the way of the project.) |
| `collections` | `%w(articles)` | An array of collections to read. Only add the ones you need as each collection increases build time. |
| `config_file` | `"#{base_path}/_config.yml"` | The config file to read from for the main site's config. |
| `config_overrides` | `nil` | A hash to override specific config values, rather than point to a new file. |
| `destination_path` | `"#{base_path}/_site"` | Directory in which to output the built site (although the site doesn't actually get written.) |
| `source_path` | `base_path` | The source for the content from which to build. |

Troubleshooting
----------

If you run into an error on your terminal saying `NoMethodError: undefined method 'sub' for nil:NilClass` here are some steps to fix it:

1. Make sure your `.env` is correct
2. Delete the `/collections` directory
3. Run `bundle update jekyll-contentful`
4. Run `bundle exec jekyll contentful && bundle exec jekyll serve`

License
----------

This project is licensed under the [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).
