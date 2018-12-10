Crossroads Media
==========

Media site for Crossroads.

You can find documentation related to custom functionality of this project [in the wiki](https://github.com/crdschurch/crds-media/wiki).

Getting Started
----------

1. Clone the project.
2. Install Ruby 2.4.0. If you haven't installed Ruby, consider using [rbenv](https://github.com/rbenv/rbenv).
3. Install Ruby dependencies (`bundle install`).
4. Install PurgeCSS globally (`npm i -g purgecss`)
5. Install the other JavaScript dependencies (`npm install`)
6. Add appropriate environment variables.
7. Pull down content (`bundle exec jekyll contentful`)
8. Start the server (`bundle exec jekyll serve`)

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
