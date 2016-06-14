/**
* NewPostController
* @namespace schreib.reviews.controllers
*/
(function () {
  'use strict';

  angular
  .module('schreib.reviews.controllers')
  .controller('NewReviewController', NewReviewController);

  NewReviewController.$inject = ['$routeParams', '$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts', 'Reviews',
                                 '$location'];

  /**
  * @namespace NewReviewController
  */
  function NewReviewController($routeParams, $rootScope, $scope, Authentication, Snackbar, Posts, Reviews, $location) {
    var vm = this;
    var post_id = undefined;

    activate();
    configureTinyMceEditorUI();

    vm.post = undefined;
    vm.submit = submit;


    /**
    * @name submit
    * @desc Create a new Review
    * @memberOf schreib.reviews.controllers.NewReviewController
    */
    function submit() {
      var content_edit = vm.getContentEdit();
      var post_id = $routeParams.id;


      $rootScope.$broadcast('review.created', {

        story: {
          id: post_id
        },

        author: {
          username: Authentication.getAuthenticatedAccount().username
        },

        content_edit: content_edit,

        language_well: vm.language_well,
        language_improve: vm.language_improve,

        character_well: vm.character_well,
        character_improve: vm.character_improve,

        setting_well: vm.setting_well,
        setting_improve: vm.setting_improve,

        structure_well: vm.structure_well,
        structure_improve: vm.structure_improve,

        theme_well: vm.theme_well,
        theme_improve: vm.theme_improve,

        post_id: post_id,

        overall_comment: vm.overall_comment,
        overall_rating: vm.overall_rating,

      });

      //console.log(Posts.get_single(vm.post.id));
      // $scope.closeThisDialog();

      Reviews.create(content_edit, vm.language_well, vm.language_improve, vm.character_well,
                 vm.character_improve, vm.setting_well, vm.setting_improve, vm.structure_well,
                 vm.structure_improve, vm.theme_well, vm.theme_improve, post_id, vm.overall_comment,
              vm.overall_rating).then(createReviewSuccessFn, createReviewErrorFn);


      /**
      * @name createPostSuccessFn
      * @desc Show snackbar with success message
      */
      function createReviewSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Review posted.');
        console.log("success!")
        window.location = '/';
      }


      /**
      * @name createPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createReviewErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('review.created.error');
        Snackbar.error(data.error);
      }
    }


    function activate() {
      var id = $routeParams.id;

      Posts.get_single(id).then(postsSuccessFn, postsErrorFn);

      function postsSuccessFn(response) {
        vm.content = response.data.id;
        vm.post = response.data;
        setPost(response.data);
        activateTinyMceContent(response.data.content);
      }



      function setPost(id) {
        post_id = id;
        // return id;
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

      vm.getContentEdit = function() {
        console.log('Editor content:', $scope.tinymceModel);
        return $scope.tinymceModel;
      };

      vm.setContent = function() {
        $scope.tinymceModel = 'Time: ' + (new Date());
        console.log('Editor content:');
      };

    }

    function configureTinyMceEditorUI() {
      $scope.tinymceOptions = {
        selector: 'textarea',
        entity_encoding: 'xml',
        plugins: 'wordcount spellchecker autoresize textcolor',
        toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | subscript superscript | forecolor',
        textcolor_map: ["FF0000", "Red"],
        menubar: false,
        browser_spellcheck: true,
      };
    }

  }
})();
