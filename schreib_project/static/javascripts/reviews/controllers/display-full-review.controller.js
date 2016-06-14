/**
* DisplayFullReviewController
* @namespace schreib.reviews.controllers
*/
(function () {
  'use strict';

  angular
  .module('schreib.reviews.controllers')
  .controller('DisplayFullReviewController', DisplayFullReviewController);

  DisplayFullReviewController.$inject = ['$scope','$location', '$routeParams', 'Posts', 'Account', 'Snackbar', 'Reviews'];

  /**
  * @namespace DisplayFullReviewController
  */
  function DisplayFullReviewController($scope, $location, $routeParams, Posts, Account, Snackbar, Reviews) {
    var vm = this;

    vm.account = undefined;
    vm.review = undefined;
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
      var review_id = $routeParams.review_id;
      var post_id = $routeParams.post_id;
      console.log(username);
      console.log(review_id);

      Account.get(username).then(accountSuccessFn, accountErrorFn);
      Posts.get_single(post_id).then(postsSuccessFn, postsErrorFn);
      Reviews.get_single(review_id).then(reviewsSuccessFn, reviewsErrorFn);

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
        console.log("POST SUCCESS");
        vm.post = response.data;
      }


      /**
      * @name postsErrorFn
      * @desc Show error snackbar
      */
      function postsErrorFn(response) {
        console.log("POST ERROR");
        Snackbar.error(response.data.error);
      }

      /**
      * @name postsSucessFn
      * @desc Update `posts` on viewmodel
      */
      function reviewsSuccessFn(response) {
        console.log("REVIEW SUCCESS");
        vm.review = response.data;
        activateTinyMceContent(response.data);
        // displayReviewElements(response.data);
      }


      /**
      * @name postsErrorFn
      * @desc Show error snackbar
      */
      function reviewsErrorFn(response) {
        console.log("REVIEW ERROR");
        Snackbar.error(response.data.error);
      }

    }


    function activateTinyMceContent(data) {

      $scope.tinymceModel = data.content_edit;

      $scope.language_well = data.language_well;
      $scope.language_improve = data.language_improve;

      $scope.character_well = data.character_well;
      $scope.character_improve = data.character_improve;

      $scope.setting_well = data.setting_well;
      $scope.setting_improve = data.setting_improve;

      $scope.structure_well = data.structure_well;
      $scope.structure_improve = data.structure_improve;

      $scope.theme_well = data.theme_well;
      $scope.theme_improve = data.theme_improve;

      $scope.overall_rating = data.overall_rating;
      $scope.overall_comment = data.overall_comment;


      vm.getContent = function() {
        console.log('Editor content:', $scope.tinymceModel);
        return $scope.tinymceModel;
      };

    // function displayReviewElements(data) {
    	// $scope.language_well = data.language_well;
      // $scope.language_improve = data.language_improve;
      //
      // $scope.character_well = data.character_well;
      // $scope.character_improve = data.character_improve;
      //
      // $scope.setting_well = data.setting_well;
      // $scope.setting_improve = data.setting_improve;
      //
      // $scope.structure_well = data.structure_well;
      // $scope.structure_improve = data.structure_improve;
      //
      // $scope.theme_well = data.theme_well;
      // $scope.theme_improve = data.theme_improve;
      //
      // $scope.overall_rating = data.overall_rating;
      // $scope.overall_comment = data.overall_comment;
    // }


    }


  }
})();
