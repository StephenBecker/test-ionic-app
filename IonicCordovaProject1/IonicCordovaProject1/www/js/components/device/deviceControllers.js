(function () {
    angular.module('controllers')



    .controller('deviceCtrl', function ($scope, $q, $interval, $cordovaNetwork, $cordovaDevice, $cordovaGeolocation) {

        $scope.navigation = { "Loading": " GPS Data" };

        //get location once then checklocation every defined interval afterward
        getCurrentLoc();
        watchLocation();

        //get network info initially
        getNetwork();

        //update on swipe
        $scope.doRefresh = function () {
            var promiseA = getNetwork();
            var promiseB = promiseA.then(function () {
                
                getCurrentLoc();
                
            });
            promiseB.finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };




        /*
        *
        *  Network Functions;
        *
        */
        //adds promise to a call
        function deferThis(functionName) {
            var def = $q.defer();
            functionName();
            def.resolve("");
            return def.promise;
        }


        //Get network parameters
        function getNetwork() {
            var def = $q.defer();
            var d = new Date();
            var n = d.toLocaleTimeString();
            $scope.network = {

                "Connection type": $cordovaNetwork.getNetwork(),
                "Is Online": $cordovaNetwork.isOnline(),
                "Is Offline": $cordovaNetwork.isOffline(),
                "Timestamp": n
            };
            def.resolve("");
            return def.promise;


        }

  

        /*
        *        
        *        Device info
        *        
        */
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



        /*
        *      
        *   Navigation functions
        *
        */



        function updateLoc(position) {
            var acc = position.coords.accuracy;
            var d = new Date();
            var n = d.toLocaleTimeString();
            $scope.navigation = {
                "Lattitude": position.coords.latitude,
                "Longitude": position.coords.longitude,
                "Accuracy": acc + " meters (or " + Math.round(acc * 3.28084) + " feet)",
                "RequestTimestamp": n,
                "PosTimestamp": new Date(position.timestamp)
            };
        };

        //gets current location
        function getCurrentLoc() {

            var posOptions = {
                maximumAge: 0,
                timeout: 10000,
                enableHighAccuracy: false
            };

            var promise = $cordovaGeolocation.getCurrentPosition(posOptions);
            promise.then(function (position) {
                updateLoc(position)
            }

            );
            promise.finally(function () {
                return promise;
            });
        };

        //updates location on a defined interval
        function watchLocation() {
            var watchOptions = {
              maximumAge: 60000,
              enableHighAccuracy: false
            };

            var watch = $cordovaGeolocation.watchPosition(watchOptions);
            watch.then(
              null,
              function (err) {
              },
              function (position) {
                  updateLoc(position);
              });
        };


    })

}());