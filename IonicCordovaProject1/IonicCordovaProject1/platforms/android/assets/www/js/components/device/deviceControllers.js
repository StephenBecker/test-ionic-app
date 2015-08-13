(function () {
    angular.module('controllers')



    .controller('deviceCtrl', function ($scope, $cordovaNetwork, $cordovaDevice, $cordovaGeolocation) {

        $scope.display = {};
        $scope.navigation = {};
        $scope.navigation.Lattitude = {};
        $scope.navigation.Longitude = {};
        $scope.navigation.acc = {};

       
        //  Network Functions;


        $scope.network = {
            "Connection type": $cordovaNetwork.getNetwork(),
            "Is Online": $cordovaNetwork.isOnline(),
            "Is Offline": $cordovaNetwork.isOffline()
        };

        //
        //Device info
        //

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



        //
        //Navigation functions
        //
        
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        var watchOptions = {
            frequency : 1000,
            timeout : 3000,
            enableHighAccuracy: false // may cause errors if true
        };
        getCurrentLoc(posOptions);
        watchLocation(watchOptions);

       
        
        function updateLoc(position) {
            var lat = position.coords.latitude,
            long = position.coords.longitude,
            acc = position.coords.accuracy;

            $scope.navigation = { "Lattitude": lat, "Longitude": long, "Accuracy": acc + " meters (or " + Math.round(acc * 3.28084) + " feet)" };
        };
       
        function getCurrentLoc(posOptions) {
            $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) { updateLoc(position) });
        };
        function watchLocation(watchOptions) {
            var watch = $cordovaGeolocation.watchPosition(watchOptions);
            watch.then(
              null,
              function (err) {
                  // error
              },
              function (position) {
                  updateLoc(position);
                  if (true) {
                    
                  }
              });
        };
        $scope.$watchGroup([$scope.navigation.Lattitude, $scope.navigation.Longitude, $scope.navigation.acc], function (newValues, oldValues, scope) {
            $scope.display = $scope.navigation;
        });
       
    })
    
}());