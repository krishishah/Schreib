(function () {
  'use strict';

  angular
    .module('schreib.posts', [
      'schreib.posts.controllers',
      'schreib.posts.directives',
      'schreib.posts.services'
    ]);

  angular
    .module('schreib.posts.controllers', ['ui.tinymce']);

  angular
    .module('schreib.posts.directives', ['ngDialog']);

  angular
    .module('schreib.posts.services', []);
})();
