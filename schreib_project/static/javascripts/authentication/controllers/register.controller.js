/**
 * Register controller
 * @namespace schreib.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('schreib.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  /**
   * @namespace RegisterController
   */
  function RegisterController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf schreib.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
     * @name register
     * @desc Register a new user
     * @memberOf schreib.authentication.controllers.RegisterController
     */
    function register() {
      Authentication.register(vm.email, vm.password, vm.username, vm.dob,
                              vm.first_name, vm.last_name, vm.likes_action,
                              vm.likes_adventure, vm.likes_crime,
                              vm.likes_fan_fiction, vm.likes_fantasy,
                              vm.likes_horror, vm.likes_romance);
    }
  }
})();
