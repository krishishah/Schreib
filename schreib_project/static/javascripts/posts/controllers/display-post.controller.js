/**
* DisplayPostController
* @namespace schreib.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('schreib.posts.controllers')
    .controller('DisplayPostController', DisplayPostController);

  DisplayPostController.$inject = ['$scope','$location', '$routeParams', 'Posts', 'Account', 'Snackbar'];

  /**
  * @namespace DisplayPostController
  */
  function DisplayPostController($scope, $location, $routeParams, Posts, Account, Snackbar) {
    var vm = this;

    vm.account = undefined;
    vm.post = undefined;
    vm.content = undefined;

    activate();
    activateTinyMce();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf schreib.posts.controllers.DisplayPostController
    */
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
        console.log(vm.account);
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
        vm.content = response.data.content;
        console.log(vm.post);
      }


      /**
        * @name postsErrorFn
        * @desc Show error snackbar
        */
      function postsErrorFn(response) {
        Snackbar.error(response.data.error);
      }
    }

    function activateTinyMce() {

      $scope.tinymceModel = vm.content;


      $scope.tinymceOptions = {
        selector: 'textarea',
        plugins: 'wordcount spellchecker autoresize save',
        toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | subscript superscript | save',
        menubar: false,
        browser_spellcheck: true,
        save_onsavecallback: (function () { console.log('Saved'); })
      };

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

    vm.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
      console.log('Editor content:');
    };



  }
})();
