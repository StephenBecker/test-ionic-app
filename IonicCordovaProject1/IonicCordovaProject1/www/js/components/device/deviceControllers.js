(function () {
    angular.module('controllers')



    .controller('deviceCtrl', function ($scope,  $interval, $cordovaNetwork, $cordovaDevice, $cordovaGeolocation) {
        

        //get location once then checklocation every second afterward
        getCurrentLoc(posOptions);

        //  Network Functions;
        getNetwork();

       
        function getNetwork() {
            $scope.network = {
                "Connection type": $cordovaNetwork.getNetwork(),
                "Is Online": $cordovaNetwork.isOnline(),
                "Is Offline": $cordovaNetwork.isOffline()
            };
           
            
        }

  


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

        var posOptions =
            {
                timeout: 10000,
                enableHighAccuracy: false
            };
        var watchOptions =
            {
                frequency: 1000,
                timeout: 3000,
                enableHighAccuracy: false
            };

        function updateLoc(position) {
            var acc = position.coords.accuracy;

            $scope.navigation = {
                "Lattitude": position.coords.latitude,
                "Longitude": position.coords.longitude,
                "Accuracy" : acc + " meters (or " + Math.round(acc * 3.28084) + " feet)"
            };
        };

        function getCurrentLoc(posOptions) {
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position)
                {
                 updateLoc(position)
                }
            );
            watchLocation(watchOptions);
        };

        //updates location on a defined interval
        function watchLocation(watchOptions)
        {
            var watch = $cordovaGeolocation.watchPosition(watchOptions);
            watch.then(
              null,
              function (err)
              {
                  // error
              },
              function (position)
              {
                  updateLoc(position);
              });
        };


    })

}());