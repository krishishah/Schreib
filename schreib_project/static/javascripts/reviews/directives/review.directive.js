/**
 * Post
 * @namespace schreib.reviews.directives
 */
(function () {
  'use strict';

  angular
    .module('schreib.reviews.directives')
    .directive('review', review);

  /**
   * @namespace Post
   */
  function review() {
    /**
     * @name directive
     * @desc The directive to be returned
     * @memberOf schreib.reviews.directives.Post
     */
    var directive = {
      restrict: 'E',
      scope: {
        review: '='
      },
      templateUrl: '/static/templates/reviews/review.html'
    };

    return directive;
  }
})();
