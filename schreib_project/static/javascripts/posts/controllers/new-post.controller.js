/**
* NewPostController
* @namespace schreib.posts.controllers
*/
(function () {
  'use strict';

  angular
  .module('schreib.posts.controllers')
  .controller('NewPostController', NewPostController);

  NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts'];

  /**
  * @namespace NewPostController
  */
  function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts) {
    var vm = this;

    activate();

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Post
    * @memberOf schreib.posts.controllers.NewPostController
    */
    function submit() {
      var content = vm.getContent();
      var title = vm.getTitle();
      var genre = vm.getGenre();

      $rootScope.$broadcast('post.created', {

        content: content,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        },
        title: title,
        genre: genre
      });

      // $scope.closeThisDialog();

      Posts.create(title, content, genre).then(createPostSuccessFn, createPostErrorFn);


      /**
      * @name createPostSuccessFn
      * @desc Show snackbar with success message
      */
      function createPostSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Post created.');
      }


      /**
      * @name createPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createPostErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('post.created.error');
        Snackbar.error(data.error);
      }
    }


    function activate() {
      $scope.tinymceModel = 'Write your story here...';

      $scope.tinymceOptions = {
        selector: 'textarea',
        entity_encoding: 'xml',
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
