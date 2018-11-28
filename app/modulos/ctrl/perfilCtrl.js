/**
* perfil Module
*
* Description
*/
angular.module('perfil', []).
controller('perfilCtrl', ['$scope', '$state', 'helpers', '$timeout', function($scope, $state, helpers, $timeout){
	$scope.viewsDatos = {};
	$scope.appDisabled = false;
	$scope.showFuncion = function (datos) {
		$scope.appDisabled = true;
		helpers.request('usuarios/:id')
		.get(datos)
		.$promise.then(function(resp){
			$scope.viewsDatos = resp.respuesta;
			if (resp.notificar) {
				helpers.notificacion(resp.mensaje, resp.tipo, true);
			}
		},function(error){
			helpers.notificacion('No es posible conectarse con el servidor', 'error', true);
		})
		.finally(function () {
			$timeout(function(){
				$scope.appDisabled = false;
			},1000);
		});	
	};


	$scope.showFuncion($state.params);
}])