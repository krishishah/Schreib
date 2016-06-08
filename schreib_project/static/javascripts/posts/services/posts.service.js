/**
* Posts
* @namespace schreib.posts.services
*/
(function () {
  'use strict';

  angular
  .module('schreib.posts.services')
  .factory('Posts', Posts);

  Posts.$inject = ['$http', 'Authentication'];

  /**
  * @namespace Posts
  * @returns {Factory}
  */
  function Posts($http) {
    var Posts = {
      all: all,
      create: create,
      get: get,
      get_single: get_single,
      get_single_content: get_single_content
    };

    return Posts;

    ////////////////////

    /**
    * @name all
    * @desc Get all Posts
    * @returns {Promise}
    * @memberOf schreib.posts.services.Posts
    */
    function all() {
      return $http.get('/api/v1/posts/');
    }


    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf schreib.posts.services.Posts
    */
    function create(title, content, genre) {
      return $http.post('/api/v1/posts/', {
        title: title,
        content: content,
        genre: genre
      });
    }

    /**
    * @name get
    * @desc Get the Post of a given user by id
    * @param {string} username The username to get Posts for
    * @returns {Promise}
    * @memberOf schreib.posts.services.Posts
    */
    function get_single(id) {
      return $http.get('/api/v1/posts/' + id + '/');
    }

    function get_single_content(id) {
      return $http.get('/api/v1/posts/' + id.content + '/');
    }

    /**
    * @name get
    * @desc Get the Posts of a given user
    * @param {string} username The username to get Posts for
    * @returns {Promise}
    * @memberOf schreib.posts.services.Posts
    */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/posts/');
    }



  }
})();
