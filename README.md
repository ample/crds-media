# Crossroads Media

Media site for Crossroads

## Troubleshooting

If you run into an error on your terminal saying `NoMethodError: undefined method 'sub' for nil:NilClass` here are some steps to fix it:
1. Make sure your .env is correct
2. Delete the `/collections` directory
3. Run `bundle update jekyll-contentful`
4. Run `bundle exec jekyll contentful && bundle exec jekyll serve`

## Custom Frontmatter Support

The following is a list of custom options for frontmatter arguments beyond what Jekyll offers.

| Name | Default | Description |
| ---- | ---- | ---- |
| `js_manifest` | `application_deferred` | The main JavaScript manifest file to load on the current page. **Do not include `.js` extension on the name.** |
| `js_vars` | `nil` | An array of local environment variables to load as global JavaScript variables. **The names of env vars will match JS vars exactly.** |
| `preloader` | `nil` | If truthy, it will render a preloading spinner on the page. |

## License

This project is licensed under the [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause).
