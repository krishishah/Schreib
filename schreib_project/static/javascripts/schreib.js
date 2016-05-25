(function () {
  'use strict';

  angular
    .module('schreib', [
      'schreib.config',
      'schreib.routes',
      'schreib.authentication',
    ]);

  angular
    .module('schreib.config', []);

  angular
    .module('schreib.routes', ['ngRoute']);

  angular
    .module('schreib')
    .run(run);

  run.$inject = ['$http'];

  /**
   * @name run
   * @desc Update xsrf $http headers to align with Django's defaults
   */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();
