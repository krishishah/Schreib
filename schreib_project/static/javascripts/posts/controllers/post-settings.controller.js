/**
 * PostSettingsController
 * @namespace schreib.posts.controllers
 */
(function () {
  'use strict';

  angular
    .module('schreib.posts.controllers')
    .controller('PostSettingsController', PostSettingsController);

  PostSettingsController.$inject = [
    '$location', '$routeParams', 'Authentication', 'Account', 'Snackbar','Posts'
  ];

  /**
   * @namespace PostSettingsController
   */
  function PostSettingsController($location, $routeParams, Authentication, Account, Posts, Snackbar) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;

    activate();


    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated.
     * @memberOf schreib.posts.controllers.PostSettingsController
     */
    function activate() {
      var authenticatedAccount = Authentication.getAuthenticatedAccount();
      var username = $routeParams.username.substr(1);
      var post_id = $routeParams.id;

      // Redirect if not logged in
      if (!authenticatedAccount) {
        $location.url('/');
        Snackbar.error('You are not authorized to view this page.');
      } else {
        // Redirect if logged in, but not the owner of this account.
        if (authenticatedAccount.username !== username) {
          debugger;
          $location.url('/');
          Snackbar.error('You are not authorized to view this page.');
        }
      }

      Account.get(username).then(postsuccessFn, accountErrorFn);
      Posts.get_single(post_id).then(postsSuccessFn, postsErrorFn);


      /**
       * @name postsuccessFn
       * @desc Update `account` for view
       */
      function accountSuccessFn(response) {
        vm.account = response.data;
        console.log(vm.account);
      }

      /**
       * @name accountErrorFn
       * @desc Redirect to index
       */
      function accountErrorFn(response) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }

      /**
        * @name postsSucessFn
        * @desc Update `posts` on viewmodel
        */
      function postsSuccessFn(response) {
        vm.post = response.data;
      }


      /**
        * @name postsErrorFn
        * @desc Show error snackbar
        */
      function postsErrorFn(response) {
        Snackbar.error(response.data.error);
      }

    }


    /**
     * @name destroy
     * @desc Destroy this account
     * @memberOf schreib.posts.controllers.PostSettingsController
     */
    function destroy() {
      Account.destroy(vm.post.id).then(accountSuccessFn, accountErrorFn);

      /**
       * @name postsuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function postsuccessFn(response) {
        window.location = '/';
        Snackbar.show('Your post has been deleted.');
      }


      /**
       * @name accountErrorFn
       * @desc Display error snackbar
       */
      function accountErrorFn(response) {
        Snackbar.error(response.data.error);
      }
    }


    /**
     * @name update
     * @desc Update this account
     * @memberOf schreib.posts.controllers.PostSettingsController
     */
    function update() {
      var username = $routeParams.username.substr(1);
      Account.update(username, vm.account).then(postsuccessFn, accountErrorFn);
      console.log(vm.account);
      /**
       * @name postsuccessFn
       * @desc Show success snackbar
       */
      function postSuccessFn(response) {
        Snackbar.show('Your account has been updated.');
      }


      /**
       * @name accountErrorFn
       * @desc Show error snackbar
       */
      function postErrorFn(response) {
        Snackbar.error(response.data.error);
      }
    }
  }
})();
