/**
 * Post
 * @namespace schreib.posts.directives
 */
(function () {
  'use strict';

  angular
    .module('schreib.posts.directives')
    .directive('post', post);

  /**
   * @namespace Post
   */
  function post() {
    /**
     * @name directive
     * @desc The directive to be returned
     * @memberOf schreib.posts.directives.Post
     */
    var directive = {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: '/static/templates/posts/post.html'
    };

    return directive;
  }
})();
