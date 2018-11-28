HenrylApp = {
	app: [],
	onInit: function (datos) {
		// importamos el archivo de configuracion inicial
		System.config({
			defaultJSExtensions: true
		});


		System.import('app/config/routing/logIn/index');
		System.import('app/config/routing/logIn/helpers').then(function () {
			
			HenrylApp.onLaunch(HenrylApp.config);
		});

	},
	onLaunch: function (config) {
		 /**
		*  Module HenryApp
		* 	
		* Description modulo principal de la app
		*/
		HenrylApp.app = angular.module('henryApp', config.modulos);
		HenrylApp.app.constant('URLBASE', 'api/api/');
		HenrylApp.app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', 'NotificationProvider',function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, NotificationProvider) {

			NotificationProvider.setOptions({
		            startTop: 30,
		            positionX: 'left',
            		positionY: 'bottom'
		        });

			
			angular.forEach(config.views, function(value, key) {
				if(value.file.length){
					value.config.resolve = {
						dependncias: ['$ocLazyLoad',function  ($ocLazyLoad) {
							return $ocLazyLoad.load([{serie: true, files: value.file }]);
						}]
					}
				}
				$stateProvider.state(value.state, value.config);
			});

			$urlRouterProvider.otherwise(config.urlInit);

			// $httpProvider.interceptors.push('interceptor');
			$locationProvider.html5Mode(true);
			// $urlRouterProvider.deferIntercept();
		}])

		.run(['$rootScope', '$http', function($rootScope, $http){
			
			
			$rootScope.stopRequest = function (){
				angular.forEach($http.pendingRequests, function(request) {
					if (request.cancel && request.timeout) {
						request.cancel.resolve();
					}
				});
			}
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
				
				$('#vistaApp').addClass('hidden');
				$('#loadingApp').removeClass('hidden');
				$rootScope.stopRequest();
			});

			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
				$('#loadingApp').addClass('hidden');
				$('#vistaApp').removeClass('hidden');
			 });

			$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
				// $('#loadingApp').addClass('hidden');
			});

			$rootScope.$on('$viewContentLoading', function(event, viewConfig){ 
		    	
			});

			

		}])
		.controller('appCtrl', ['$scope', function($scope){
			$scope.nuevoJson = function (json) {
				return JSON.parse(JSON.stringify(json));
			}
		}])
		.directive('stringToNumber', function() {
		  return {
		    require: 'ngModel',
		    link: function(scope, element, attrs, ngModel) {
		      ngModel.$parsers.push(function(value) {
		        return '' + value;
		      });
		      ngModel.$formatters.push(function(value) {
		        return parseFloat(value);
		      });
		    }
		  };
		});

		setTimeout(function(){
			// lanzamos la app
			angular.bootstrap(document.body, ['henryApp'], {
				strictDi: true
			});
		},500);
	}
}