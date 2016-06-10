/**
* DisplayPostController
* @namespace schreib.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('schreib.reviews.controllers')
    .controller('DisplayReviewController', DisplayReviewController);

  DisplayReviewController.$inject = ['$scope','$location', '$routeParams', 'Posts', 'Account', 'Snackbar'];

  /**
  * @namespace DisplayPostController
  */
  function DisplayReviewController($scope, $location, $routeParams, Posts, Account, Snackbar) {
    var vm = this;

    vm.account = undefined;
    vm.post = undefined;

    configureTinyMceEditorUI();

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf schreib.posts.controllers.DisplayPostController
    */

    function configureTinyMceEditorUI() {
      $scope.tinymceOptions = {
        selector: '#readarea',
        entity_encoding: 'xml',
        readonly: 1,
        plugins: 'autoresize',
        toolbar: false,
        menubar: false,
        statusbar: false,
        save_onsavecallback: (function () { console.log('Saved'); })
      };
    }


    function activate() {

      var username = $routeParams.username.substr(1);
      var id = $routeParams.id;
      console.log(username);
      console.log(id);

      Account.get(username).then(accountSuccessFn, accountErrorFn);
      Posts.get_single(id).then(postsSuccessFn, postsErrorFn);

      /**
      * @name accountSuccessAccount
      * @desc Update `account` on viewmodel
      */
      function accountSuccessFn(response) {
        vm.account = response.data;
      }


      /**
      * @name accountErrorFn
      * @desc Redirect to index and show error Snackbar
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
        activateTinyMceContent(response.data.content);
      }


      /**
        * @name postsErrorFn
        * @desc Show error snackbar
        */
      function postsErrorFn(response) {
        Snackbar.error(response.data.error);
      }

    }


    function activateTinyMceContent(content) {

      $scope.tinymceModel = content;

      vm.getContent = function() {
        console.log('Editor content:', $scope.tinymceModel);
        return $scope.tinymceModel;
      };

      vm.getTitle = function() {
        console.log('Title:', $scope.title);
        return $scope.title;
      };

      vm.getGenre = function() {
        console.log('Genre:', $scope.genre);
        return $scope.genre;
      };

    }


  }
})();
