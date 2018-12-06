module.exports = [
  {
    name: 'application',
    deps: [
      'vendor/jquery-3.3.1.min'
    ],
    files: [
      'lib/set-redirect-url'
    ]
  },
  {
    name: 'application_deferred',
    deps: [
      'vendor/bootstrap.min',
      'vendor/imgix.min',
      'vendor/addthis_widget.min',
      'vendor/clipboard.min',
      'vendor/crds-card-carousel-v0.2.0.min',
      'vendor/flickity.pkgd.min',
      'vendor/imgix-optimizer',
      'vendor/moment.min',
      'vendor/reactive-auth-v0.0.1.umd',
      'vendor/knockout-3.4.2',
      'vendor/crds-status-message-v0.1.3.min'
    ],
    files: [
      'components/clipboard',
      'components/header',
      'components/images',
      'components/carousels',
      'components/pagination',
      'components/tabs',
      'components/track-viewport',
      'components/roll-call',
      'components/dates',
      'components/menu-squencher',
      'components/status-message',
      'lib/header'
    ]
  },
  {
    name: 'preview_deferred',
    deps: [
      'vendor/bootstrap.min',
      'vendor/imgix.min',
      'vendor/addthis_widget.min',
      'vendor/clipboard.min',
      'vendor/marked',
      'vendor/imgix-optimizer'
    ],
    files: [
      'components/clipboard',
      'components/header',
      'components/images',
      'components/preview',
      'components/menu-squencher'
    ]
  }
];
