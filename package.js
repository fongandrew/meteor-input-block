Package.describe({
  name: 'fongandrew:input-block',
  version: '0.1.0',
  summary: 'SimpleSchema form helpers, lightweight alternative to some ' + 
           'parts of autoform.',
  git: 'https://github.com/fongandrew/meteor-input-block.git'
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
