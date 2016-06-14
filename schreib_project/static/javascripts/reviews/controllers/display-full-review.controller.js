/**
* DisplayFullReviewController
* @namespace schreib.reviews.controllers
*/
(function () {
  'use strict';

  angular
  .module('schreib.reviews.controllers')
  .controller('DisplayFullReviewController', DisplayFullReviewController);

  DisplayPostController.$inject = ['$scope','$location', '$routeParams', 'Posts', 'Account', 'Snackbar', 'Reviews'];

  /**
  * @namespace DisplayFullReviewController
  */
  function DisplayFullReviewController($scope, $location, $routeParams, Posts, Account, Snackbar, Reviews) {
    var vm = this;

    vm.account = undefined;
    vm.review = undefined;
    vm.post = 

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
      Reviews.get_single(id).then(reviewsSuccessFn, reviewsErrorFn);

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
      function reviewsSuccessFn(response) {
        vm.review = response.data;
        activateTinyMceContent(response.data.content_edit);
        displayReviewElements(response.data);
      }


      /**
      * @name postsErrorFn
      * @desc Show error snackbar
      */
      function reviewsErrorFn(response) {
        Snackbar.error(response.data.error);
      }

    }


    function activateTinyMceContent(content_edit) {

      $scope.tinymceModel = content_edit;

      vm.getContent = function() {
        console.log('Editor content:', $scope.tinymceModel);
        return $scope.tinymceModel;
      };

    function displayReviewElements(data) {
    	$scope.
    }


    }


  }
})();
