(function () {
    function DeckDetailsCtrl(user, $firebaseObject, $firebaseArray, $state, $cordovaCamera, $jrCrop) {
        this.$state = $state;
        this.$cordovaCamera = $cordovaCamera;
        this.$jrCrop = $jrCrop;

        if ($state.params.deckId) {
            this.editMode = true;
            this.deck = $firebaseObject(new Firebase('https://kg-magic.firebaseio.com/users/' + user.uid + '/decks/' + $state.params.deckId));
        } else {
            this.editMode = false;
            this.userDecks = $firebaseArray(new Firebase('https://kg-magic.firebaseio.com/users/' + user.uid + '/decks'));
        }
    }


    DeckDetailsCtrl.prototype.takePicture = function () {
        var self = this;

        var cameraOptions = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            popoberOptions: CameraPopoverOptions,
            targetWidth: 800,
            targetHeight: 800,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        this.$cordovaCamera.getPicture(cameraOptions)
            .then(function (imgData) {
                return self.$jrCrop.crop({
                    url: 'data:image/jpeg;base64,' + imgData,
                    width: 312,
                    height: 250
                });
            })
            .then(function (canvas) {
                self.deck.image = canvas.toDataURL();
            });
    };

    DeckDetailsCtrl.prototype.save = function () {
        if (this.editMode) {
            this.deck.$save();
        } else {
            this.userDecks.$add(this.deck);
        }

        this.$state.go('tab.decks');
    };

    angular.module('kgMagic').controller('DeckDetailsCtrl', DeckDetailsCtrl);

})();
