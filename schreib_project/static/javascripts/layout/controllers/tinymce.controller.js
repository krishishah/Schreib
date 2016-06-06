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
      
    vm.submit = submit;

    activate();
    
    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf schreib.layout.controllers.TinyMceController
    */
    function activate() {
      $scope.tinymceModel = 'Write your story here...';

      $scope.tinymceOptions = {
        selector: '#textarea',
        plugins: 'wordcount spellchecker autoresize save',
        toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | subscript superscript | save',
        menubar: false,
        browser_spellcheck: true,
        save_onsavecallback: (function () { console.log('Saved'); })
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

//      save_onsavecallback: console.log('Story saved')
    }
      
    function submit() {
        NewPostController.submit();
    }


  }
})();
