(function() {
angular.module('controllers')



.controller('FlashlightCtrl', function ($scope, $cordovaFlashlight) {
    $scope.flashlightSet = function (flashlight) {
        if ($cordovaFlashlight.available()) {
            if (flashlight) {
                $cordovaFlashlight.switchOn();
            } else {
                $cordovaFlashlight.switchOff();
            }
        } else {
            alert("no flashlight detected")
        }
  };
})

}());