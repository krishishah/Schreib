/**
* TinyMceController
* @namespace schreib.layout.controllers
*/
(function () {

  angular
    .module('schreib.layout.controllers')
    .controller('TinyMceController', TinyMceController);

  TinyMceController.$inject = ['$scope', 'Authentication', 'Posts'];

  function TinyMceController($scope, Authentication, Posts) {
    var vm = this;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf schreib.layout.controllers.TinyMceController
    */
    function activate() {
      $scope.tinymceModel = 'Initial content';

      $scope.tinymceOptions = {
        plugins: 'link image code spellchecker save',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | save'
      };

      vm.getContent = function() {
        console.log('Editor content:', $scope.tinymceModel);
      };

      vm.setContent = function() {
        $scope.tinymceModel = 'Time: ' + (new Date());
        console.log('Editor content:');

      };

      // save_onsavecallback: (function () {
      //   console.log('Saved');
      //   NewPostController.submit();
      // })

      save_onsavecallback: console.log('Story saved')
    }
  }
})();
