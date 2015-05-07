(function () {
    function GameCtrl($scope, $state, $firebaseObject, user) {
        var self = this;
        this.$state = $state;
        this.user = user;

        this.gameFbObj = $firebaseObject(new Firebase('https://kg-magic.firebaseio.com/games/' + $state.params.gameId));

        this.gameFbObj.$watch(function () {
            //If the game has been deleted
            if (!self.gameFbObj.creator) {
                self.$state.go('tab.setupGame');
            }
        });

        this.gameFbObj.$loaded().then(function () {
            if (self.game.creator.id === user.uid) {
                self.userKey = 'creator';
                self.opponentKey = 'joiner';
            } else {
                self.userKey = 'joiner';
                self.opponentKey = 'creator';
            }
        });
    }

    GameCtrl.prototype.endGame = function () {
        this.gameFbObj.$remove();
        this.$state.go('tab.setupGame');
    };

    GameCtrl.prototype.getUserPlayer = function () {
        return this.game && this.game[this.userKey];
    };

    GameCtrl.prototype.getOpponentPlayer = function () {
        return this.game && this.game[this.opponentKey];
    };

    angular.module('kgMagic').controller('GameCtrl', GameCtrl);

})();
