/**
* helpers Module
*
* Description
*/
angular.module('helpers', [])
.factory('helpers', ['$resource', 'URLBASE', '$q', 'Notification', 'SweetAlert', '$timeout', function($resource, URLBASE, $q, Notification, SweetAlert, $timeout){
	helpers = {};
	helpers.request = function(finalUrl) {
		deferr = $q.defer();
		return $resource(URLBASE+finalUrl, null, {
			update: {
				method: "PUT",
				params: {
                    id: "@id",
                }
			},
			store: {
                method: 'POST',
        		headers: {
        			'Content-Type': undefined
        		}
            }
		});
	};

	helpers.notificacion = function  (msj, tipo, nuevoMsj) {
		Notification({
			message: msj,
			replaceMessage: nuevoMsj /*remplaza el mensaje*/
		}, tipo);
	};

	helpers.sweetAlertFinal = function(titulo, mensaje, tipoVentana /*success,  warning, info, etc*/ ) {
        SweetAlert.swal(titulo, mensaje, tipoVentana);
    };
	helpers.sweetAlertAccion = function(titulo, mensaje, tipoVentana /*success, warning, info, etc*/ , accionBtn /*texto del boton eliminar*/ , callback) {
		SweetAlert.swal({
			title: titulo,
			text: mensaje,
			type: tipoVentana,
			showCancelButton: true,
			confirmButtonClass: "btn-danger",
			confirmButtonText: accionBtn,
			closeOnConfirm: false
		}, function(isConfirm) {
			callback(isConfirm);
		});
	};
	helpers.sweetAlertRequest = function(titulo, mensaje, tipoVentana /*success, warning, info, etc*/ , callbak) {
        SweetAlert.swal({
            title: titulo,
            text: mensaje,
            type: tipoVentana,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function(isConfirm) {
            callbak(isConfirm);
        });
    };

	return helpers;
}])