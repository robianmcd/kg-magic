(function () {
    function DecksCtrl($state, user, $firebaseArray) {
        this.$state = $state;
        this.decks = $firebaseArray(new Firebase('https://kg-magic.firebaseio.com/users/' + user.uid + '/decks'));
    }

    angular.module('kgMagic').controller('DecksCtrl', DecksCtrl);

    DecksCtrl.prototype.addDeck = function () {
        this.$state.go('tab.deck-detail');
    };

    DecksCtrl.prototype.removeDeck = function (deck) {
        this.decks.$remove(deck);
    };

    DecksCtrl.prototype.editDeck = function (deck) {
        this.$state.go('tab.deck-detail', {deckId: deck.$id});
    };


})();
