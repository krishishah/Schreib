(function () {
  'use strict';

  angular
    .module('schreib.reviews', [
      'schreib.reviews.controllers',
      'schreib.reviews.directives',
      'schreib.reviews.services'
    ]);

  angular
    .module('schreib.reviews.controllers', ['ui.tinymce']);

  angular
    .module('schreib.reviews.directives', ['ngDialog']);

  angular
    .module('schreib.reviews.services', []);
})();
