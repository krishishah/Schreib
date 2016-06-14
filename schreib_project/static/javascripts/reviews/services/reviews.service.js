/**
* Reviews
* @namespace schreib.reviews.services
*/
(function () {
  'use strict';

  angular
  .module('schreib.reviews.services')
  .factory('Reviews', Reviews);

  Reviews.$inject = ['$http','Authentication','Posts'];

  /**
  * @namespace Reviews
  * @returns {Factory}
  */
  function Reviews($http) {
    var Reviews = {
      all: all,
      create: create,
      get: get,
      get_single: get_single,
      get_by_post_id: get_by_post_id
      //destroy: destroy
    };

    return Reviews;

    ////////////////////

    /**
    * @name all
    * @desc Get all Reviews
    * @returns {Promise}
    * @memberOf schreib.reviews.services.Reviews
    */
    function all() {
      return $http.get('/api/v1/reviews/');
    }


    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf schreib.reviews.services.Reviews
    */
    function create(content_edit, language_well, language_improve, character_well,
      character_improve, setting_well, setting_improve, structure_well,
      structure_improve, theme_well, theme_improve, post_id, overall_comment,
      overall_rating) {

        return $http.post('/api/v1/reviews/' , {
          content_edit: content_edit,

          language_well: language_well,
          language_improve: language_improve,

          character_well: character_well,
          character_improve: character_improve,

          setting_well: setting_well,
          setting_improve: setting_improve,

          structure_well: structure_well,
          structure_improve: structure_improve,

          theme_well: theme_well,
          theme_improve: theme_improve,

          post_id: post_id,

          overall_comment: overall_comment,
          overall_rating: overall_rating,

        });
      }

      /**
      * @name get
      * @desc Get the Post of a given user by id
      * @param {string} username The username to get Reviews for
      * @returns {Promise}
      * @memberOf schreib.reviews.services.Reviews
      */
      function get_single(id) {
        return $http.get('/api/v1/reviews/' + id + '/');
      }


      /**
      * @name get
      * @desc Get the Reviews of a given user
      * @param {string} username The username to get Reviews for
      * @returns {Promise}
      * @memberOf schreib.reviews.services.Reviews
      */
      function get(username) {
        return $http.get('/api/v1/accounts/' + username + '/reviews/');
      }

      function get_by_post_id(post_id) {
        return $http.get('/api/v1/posts/' + post_id + '/reviews/');
      }


      /**
      * @name destroy
      * @desc Destroys the post with username `username` and id 'id'
      * @param {string} id The id of the post to be destroyed
      * @returns {Promise}
      * @memberOf schreib.reviews.services.Reviews
      */
      // function destroy(id,username) {
      //   return $http.delete('/api/v1/accounts/' + id '/' + username + '/');
      // }

    }
  })();
