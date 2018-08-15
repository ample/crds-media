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

Documentation for pagination has [moved with the gem](https://github.com/ample/paging-mister-hyde).

### Merging Collections

Existing collections can be combined together using the (local) jekyll-collection-merger gem. Do this by adding a `merged_collections` option to your `_config.yml` file.

Each merged collection gets a name, a list of collections to merge, and a directive for sorting. If sorting is missing, the collection is returned as-is.

The resulting collection is available on the site's config object and can be used in liquid templates directly on the site object.

Take the following configuration:

```yml
merged_collections:
  recent_media:
    merge:
      - articles
      - videos
    sort: date desc
```

This combines articles and videos collections then sorts them by date in descending order. It then presents the combined collections of docs on the site object when working with templates:

```liquid
{% for obj in site.recent_media limit: 8 %}
  {{ obj.title }}
{% endfor %}
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

Hotfixing with cherry-pick'd commits
---------

1. Locate the commit hash of the commit you would like to hotfix.
2. Create a `hotfix` branch and use `git cherry-pick <commit-hash>` to add the
   commit/s
3. Push the hotfix branch and create a pull request against `release` (demo). Check
   your work on `mediademo.crossroads.net`.
4. If things looked good, simply create another pull request comparing `release` to
   `master` (prod). Once merged, you will have hotfixed all envs!

_note: make sure you don’t “Squash and Merge”. Leave a merge commit._

Updates to DDK
----------

When making changes in the DDK that should be reflected in this project:

1. In the `crds-media` Gemfile, change the `crds-styles` gem to point at development by adding `, branch: 'development'`

For example:

  ```gem 'crds-styles', "~> 3.0.1", git: 'https://github.com/crdschurch/crds-styles.git', branch: 'development'```

2. Once your pull request is merged in `crds-styles`, run `bundle update crds-styles` in `crds-media`

License
----------

This project is licensed under the [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).
