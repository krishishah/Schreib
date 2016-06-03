/**
 * Authentication
 * @namespace schreib.authentication.services
 */
(function () {
  'use strict';

  angular
    .module('schreib.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
   * @namespace Authentication
   * @returns {Factory}
   */
  function Authentication($cookies, $http) {
    /**
     * @name Authentication
     * @desc The Factory to be returned
     */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      register: register,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate
    };

    return Authentication;

    ///////////////////

    /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf schreib.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$cookies.get("authenticatedAccount")) {
        console.log("no cookie");
        return;
      }
      console.log("cookie");

      return JSON.parse($cookies.get("authenticatedAccount"));
    }


    /**
     * @name isAuthenticated
     * @desc Check if the current user is authenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf schreib.authentication.services.Authentication
     */
    function isAuthenticated() {
      Authentication.getAuthenticatedAccount();
      return !!$cookies.get("authenticatedAccount");
    }


    /**
     * @name login
     * @desc Try to log in with email `email` and password `password`
     * @param {string} email The email entered by the user
     * @param {string} password The password entered by the user
     * @returns {Promise}
     * @memberOf schreib.authentication.services.Authentication
     */
    function login(email, password) {
      return $http.post('/api/v1/auth/login/', {
        email: email, password: password
      }).then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(response) {
        Authentication.setAuthenticatedAccount(response.data);

        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn(response) {
        console.error('Epic failure!');
      }
    }


    /**
     * @name logout
     * @desc Try to log the user out
     * @returns {Promise}
     * @memberOf schreib.authentication.services.Authentication
     */
    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      /**
       * @name logoutSuccessFn
       * @desc Unauthenticate and redirect to index with page reload
       */
      function logoutSuccessFn(response) {
        Authentication.unauthenticate();

        window.location = '/';
      }

      /**
       * @name logoutErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function logoutErrorFn(response) {
        console.error('Epic failure!');
      }
    }


    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} email The email entered by the user
    * @param {string} password The password entered by the user
    * @param {string} username The username entered by the user
    * @returns {Promise}
    * @memberOf schreib.authentication.services.Authentication
    */
    function register(email, password, username, dob, first_name, last_name) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email,
        dob: dob,
        first_name: first_name,
        last_name: last_name
      }).then(registerSuccessFn, registerErrorFn);

      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(response) {
        Authentication.login(email, password);
      }

      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(response) {
        console.error('Epic failure!');
      }
    }


    /**
     * @name setAuthenticatedUser
     * @desc Stringify the account object and store it in a cookie
     * @param {Object} account The acount object to be stored
     * @returns {undefined}
     * @memberOf schreib.authentication.services.Authentication
     */
    function setAuthenticatedAccount(account) {
      //console.log(JSON.parse(JSON.stringify(account)));
      $cookies.put("authenticatedAccount", JSON.stringify(account));
      //$cookies.authenticatedAccount = JSON.stringify(account);
    }


    /**
     * @name unauthenticate
     * @desc Delete the cookie where the account object is stored
     * @returns {undefined}
     * @memberOf schreib.authentication.services.Authentication
     */
    function unauthenticate() {
      $cookies.remove("authenticatedAccount");
    }
  }
})();
