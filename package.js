Package.describe({
  name: 'fongandrew:input-block',
  version: '0.1.0',
  summary: 'Helper for showing SimpleSchema validation errors on forms. ' +
           'Lightweight alternative to autoform.'
});

Package.onUse(function(api) {
  'use strict';
  api.versionsFrom('METEOR@1.1.0.2');
  api.use([
    'aldeed:simple-schema',
    'underscore',
    'templating'
  ], 'client');
  api.addFiles([
    'input_block.html',
    'input_block.js'
  ], 'client');
  api.export('InputBlock');
});
