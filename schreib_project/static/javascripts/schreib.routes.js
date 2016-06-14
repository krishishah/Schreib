(function () {
  'use strict';

  angular
    .module('schreib.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/', {
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html'
    }).when('/register', {
      controller: 'RegisterController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/register.html'
    }).when('/login', {
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/authentication/login.html'
    }).when('/profile',{
      templateUrl: '/static/templates/profile.html'
    }).when('/create',{
      controller: 'NewPostController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/posts/new-post_tiny.html'
    }).when('/discover',{
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html'
    }).when('/+:username', {
      controller: 'AccountController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/accounts/account.html'
    }).when('/+:username/posts/:id',{
      controller: 'DisplayPostController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/posts/display-post.html'
    }).when('/+:username/settings', {
      controller: 'AccountSettingsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/accounts/settings.html'
    }).when('/+:username/posts/:id/review', {
      controller: 'NewReviewController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/reviews/new-review.html'
    }).when('/+:username/works', {
      controller: 'AccountController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/accounts/my-works.html'
    }).when('/+:username/reviews/:review_id/posts/:post_id', {
      controller: 'DisplayFullReviewController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/reviews/full-review.html'
    }).otherwise('/');
  }
})();
