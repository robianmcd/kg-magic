(function () {
    function SetupGameCtrl($scope, $ionicModal, $state, user, $firebaseArray, $firebaseObject) {
        var self = this;
        this.$scope = $scope;
        this.decks = $firebaseArray(new Firebase('https://kg-magic.firebaseio.com/users/' + user.uid + '/decks'));
        this.games = $firebaseArray(new Firebase('https://kg-magic.firebaseio.com/games/'));
        this.gameMap = $firebaseObject(new Firebase('https://kg-magic.firebaseio.com/games/'));

        $ionicModal.fromTemplateUrl('templates/createGameModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            self.createGameModal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/joinGameModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            self.joinGameModal = modal;
        });



        $scope.createCtrl = {
            decks: this.decks,
            games: this.games,
            createGame: function () {
                var newGame = {
                    title: this.gameName,
                    creator: {
                        id: user.uid,
                        name: user.google.displayName,
                        pic: user.google.cachedUserProfile.picture,
                        deckId: this.selectedDeck.$id,
                        life: 20
                    }
                };

                this.games.$add(newGame).then(function (gameRef) {
                    $state.go('tab.game', {gameId: gameRef.key()});
                    self.createGameModal.hide();
                });
            },
            cancel: function () {
                self.createGameModal.hide();
            }
        };

        $scope.joinCtrl = {
            decks: this.decks,
            gameMap: this.gameMap,
            joinGame: function () {
                this.gameMap[this.game.$id].joiner = {
                    id: user.uid,
                    name: user.google.displayName,
                    pic: user.google.cachedUserProfile.picture,
                    deckId: this.selectedDeck.$id,
                    life: 20
                };

                this.gameMap.$save();
                $state.go('tab.game', {gameId: this.game.$id});
                self.joinGameModal.hide();
            },
            cancel: function () {
                self.joinGameModal.hide();
            }
        };
    }

    angular.module('kgMagic').controller('SetupGameCtrl', SetupGameCtrl);

    SetupGameCtrl.prototype.createGame = function () {
        this.createGameModal.show();
    };

    SetupGameCtrl.prototype.joinGame = function (game) {
        this.$scope.joinCtrl.game = game;
        this.joinGameModal.show();
    };

})();
