// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


	var controllers = angular.module('controllers', []);
	var directives = angular.module('directives', []);
	var services = angular.module('services', []);
	var routes = angular.module('routes', []);


angular.module('starter', ['ionic', 'controllers', 'services', 'routes', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      console.log($cordovaNetwork.getNetwork());
      console.log($cordovaNetwork.isOnline());
      console.log($cordovaNetwork.isOffline());
      console.log(JSON.stringify(window.navigator));
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})



