/**
* Posts
* @namespace schreib.reviews.directives
*/
(function () {
  'use strict';

  angular
    .module('schreib.reviews.directives')
    .directive('reviews', reviews);

  /**
  * @namespace Posts
  */
  function reviews() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf schreib.reviews.directives.Posts
    */
    var directive = {
      controller: 'ReviewsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        reviews: '='
      },
      templateUrl: '/static/templates/reviews/reviews.html'
    };

    return directive;
  }
})();
