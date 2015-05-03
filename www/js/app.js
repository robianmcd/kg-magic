angular.module('kgMagic', ['ionic', 'firebase', 'ngCordova', 'jrCrop'])

    .run(function ($ionicPlatform, $rootScope, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go("login");
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl as ctrl'
            })
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                controller: 'TabsCtrl as tabsCtrl',
                resolve: {
                    "user": ["auth", function (auth) {
                        return auth.$requireAuth();
                    }]
                }
            })
            .state('tab.decks', {
                url: '/decks',
                views: {
                    'tab-decks': {
                        templateUrl: 'templates/decks.html',
                        controller: 'DecksCtrl as ctrl'
                    }
                }
            })
            .state('tab.setupGame', {
                url: '/setupGame',
                views: {
                    'tab-play': {
                        templateUrl: 'templates/setupGame.html',
                        controller: 'SetupGameCtrl as ctrl'
                    }
                }
            })
            .state('tab.deck-detail', {
                url: '/decks/details/:deckId',
                views: {
                    'tab-decks': {
                        templateUrl: 'templates/deckDetails.html',
                        controller: 'DeckDetailsCtrl as ctrl'
                    }
                }
            })
            .state('tab.game', {
                url: '/game/:gameId',
                views: {
                    'tab-play': {
                        templateUrl: 'templates/game.html',
                        controller: 'GameCtrl as ctrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    })

    .factory('fbRef', function () {
        return new Firebase('https://kg-magic.firebaseio.com/');
    })

    .factory('auth', function ($firebaseAuth, fbRef) {
        return $firebaseAuth(fbRef);
    }
);