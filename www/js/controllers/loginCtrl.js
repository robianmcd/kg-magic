(function () {
    function LoginCtrl(auth, $state, $firebaseAuth) {
        this.auth = auth;
        this.$state = $state;
        this.$firebaseAuth = $firebaseAuth;
    }

    LoginCtrl.prototype.googleLogin = function() {
        var self = this;



        /*
        this.auth.$authWithOAuthPopup("google").then(function(authData) {
            self.$state.go('tab.decks');
        }).catch(function(error) {
            console.log("Authentication failed:", error);
        });
        */
    };

    angular.module('kgMagic').controller('LoginCtrl', LoginCtrl);

})();
