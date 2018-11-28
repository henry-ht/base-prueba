/**
* usuarios Module
*
* Description
*/
angular.module('usuarios', [])
.controller('usuariosCtrl', ['$scope', 'helpers', '$timeout', function($scope, helpers, $timeout){
	$scope.viewsDatos = [];
	$scope.appDisabled = false;
	$scope.nuevo = {};
	$scope.edicion = [];

	$scope.indexFuncion = function () {
		$scope.appDisabled = true;
		helpers.request('usuarios')
		.get()
		.$promise.then(function(resp){
			$scope.viewsDatos = resp.respuesta;
			if (resp.tipo == 'warning') {
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

	$scope.deleteFuncion = function (output) {
		helpers.sweetAlertAccion('Eliminar Usuario', 'Esta seguro de eliminar este usuario', 'warning', 'Eliminar', function(confir){
			if (confir) {
				$scope.appDisabled = true;
				helpers.request('usuarios/:id')
				.delete(output)
				.$promise.then(function(resp){
					if (resp.respuesta) {
						$scope.indexFuncion();
					}
					if (resp.notificar) {
						helpers.sweetAlertFinal(resp.mensaje , null, resp.tipo);
					}
				},function(error){
					helpers.notificacion('No es posible conectarse con el servidor', 'error', true);
				})
				.finally(function () {
					$timeout(function(){
						$scope.appDisabled = false;
					},1000);
				});
			}
		});
	};

	$scope.storeFuncion = function (datos) {
		$scope.appDisabled = true;
		helpers.request('usuarios')
		.save(datos)
		.$promise.then(function(resp){
			var mensaje = [];
			if (typeof(resp.mensaje) == 'string') {
				mensaje.push({uno: [resp.mensaje]});
			}else{
				mensaje.push(resp.mensaje);
			}
			if (resp.tipo == 'success') {
				$scope.nuevo = {};
			}
			angular.forEach(mensaje, function(value, key) {
				angular.forEach(value, function(valueDos, keyDos) {
					helpers.notificacion(valueDos[0], resp.tipo, false);
				});
			});
			
		},function(error){
			helpers.notificacion('No es posible conectarse con el servidor', 'error', true);
		})
		.finally(function () {
			$timeout(function(){
				$scope.appDisabled = false;
			},1000);
		});	
	};

	$scope.updateFuncion = function (datos, index) {
		$scope.appDisabled = true;
		helpers.request('usuarios/:id')
		.update(datos)
		.$promise.then(function(resp){
			var mensaje = [];
			if (typeof(resp.mensaje) == 'string') {
				mensaje.push({uno: [resp.mensaje]});
			}else{
				mensaje.push(resp.mensaje);
			}
			if (resp.respuesta) {
				$("[data-dismiss=modal]").trigger({ type: "click" });
				$scope.indexFuncion();
				$scope.edicion = [];
				// $scope.viewsDatos.usuarios[index] = resp.respuesta;
			}
			
			angular.forEach(mensaje, function(value, key) {
				angular.forEach(value, function(valueDos, keyDos) {
					helpers.notificacion(valueDos[0], resp.tipo, false);
				});
			});
		},function(error){
			helpers.notificacion('No es posible conectarse con el servidor', 'error', true);
		})
		.finally(function () {
			$timeout(function(){
				$scope.appDisabled = false;
			},1000);
		});	
	};



	$scope.indexFuncion();
	
}]);