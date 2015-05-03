(function () {
    function TabsCtrl(auth, $state) {
        this.auth = auth;
        this.$state = $state;
    }

    angular.module('kgMagic').controller('TabsCtrl', TabsCtrl);

    TabsCtrl.prototype.logout = function() {
        this.auth.$unauth();
        this.$state.go('login');
    };
    
})();
