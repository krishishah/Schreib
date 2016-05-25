(function () {
  'use strict';

  angular
    .module('schreib.authentication', [
      'schreib.authentication.controllers',
      'schreib.authentication.services'
    ]);

  angular
    .module('schreib.authentication.controllers', []);

  angular
    .module('schreib.authentication.services', ['ngCookies']);
})();
