/**
* DisplayPostController
* @namespace schreib.posts.controllers
*/
(function () {
  'use strict';

  angular
  .module('schreib.posts.controllers')
  .controller('DisplayPostController', DisplayPostController);

  DisplayPostController.$inject = ['$scope','$location', '$routeParams', 'Posts', 'Account', 'Snackbar', 'Reviews'];

  /**
  * @namespace DisplayPostController
  */
  function DisplayPostController($scope, $location, $routeParams, Posts, Account, Snackbar, Reviews) {
    var vm = this;

    vm.account = undefined;
    vm.post = undefined;

    vm.reviews = [];
    configureTinyMceEditorUI();

    activate();

    activateReviews();


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

    function activateReviews() {

      var post_id = $routeParams.id;

      Reviews.all().then(reviewsSuccessFn, reviewsErrorFn);
      //Reviews.get_by_post_id(post_id).then(reviewsSuccessFn, reviewsErrorFn);


      $scope.$on('review.created', function (event, review) {
        vm.reviews.unshift(post);
      });

      $scope.$on('reviews.created.error', function () {
        vm.reviews.shift();
      });

      /**
      * @name reviewsSucessFn
      * @desc Update `reviews` on viewmodel
      */
      function reviewsSuccessFn(response) {
        var revs = response.data;
        console.log(response.data);
        for(var i = 0; i < revs.length; i++) {
          if(revs[i].story.id == post_id) {
            vm.reviews.push(revs[i]);
          }
        }

        //vm.reviews = response.data;
      }


      /**
      * @name reviewsErrorFn
      * @desc Show error snackbar
      */
      function reviewsErrorFn(response) {
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
