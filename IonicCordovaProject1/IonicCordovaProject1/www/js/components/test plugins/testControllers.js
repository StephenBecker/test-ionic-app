(function () {
    angular.module('controllers')



    .controller('testCtrl', function ($scope, $cordovaNetwork, $cordovaDevice, $cordovaGeolocation) {

       
       
        //  $scope.isOnline = Cordova.isOnline();


        $scope.network = {
            "Connection type": $cordovaNetwork.getNetwork(),
            "Is Online": $cordovaNetwork.isOnline(),
            "Is Offline": $cordovaNetwork.isOffline()
        };
        $scope.device = {
            // "Device": $cordovaDevice.getDevice(),
            "Cordova Version": $cordovaDevice.getCordova(),
            "Device Model": $cordovaDevice.getModel(),
            "Device Name": $cordovaDevice.getName(),
            "Device operating system name": $cordovaDevice.getPlatform(),
            "Universally Unique Identifier": $cordovaDevice.getUUID(),
            "Operating system version": $cordovaDevice.getVersion(),
            "Device Manufacturer": $cordovaDevice.getManufacturer()
        };

        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            var lat = position.coords.latitude,
            long = position.coords.longitude,
            acc = position.coords.accuracy;

            $scope.navigation = {"Lattitued":lat, "Longitude":long, "Accuracy":acc};
            });


       
        
       
       
       
    })
    
}());