'use strict';

angular
  .module('mainApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/', {
        url: 'dashboard',
        templateUrl: '../../views/dashboard.html',
        controller: 'dashboardCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '../../views/dashboard.html',
        controller: 'dashboardCtrl'
      })
      .state('client', {
        url: '/client',
        templateUrl: '../../views/client.html',
        controller: 'clientCtrl'
      })
      .state('devis', {
        url: '/devis',
        templateUrl: '../../views/devis.html',
        controller: 'devisCtrl'
      })
      .state('facture', {
        url: '/facture',
        templateUrl: '../../views/facture.html',
        controller: 'factureCtrl'
      })
  });