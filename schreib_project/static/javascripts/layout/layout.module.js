(function () {
  'use strict';

  angular
    .module('schreib.layout', [
      'schreib.layout.controllers'
    ]);

  angular
    .module('schreib.layout.controllers', ['ui.tinymce']);

  //var myAppModule = angular.module('myApp', ['ui.tinymce']);

})();
