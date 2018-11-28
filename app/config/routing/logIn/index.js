// definimos la configuracion para las vistas con logIn
HenrylApp.config = {
	urlInit: '/principal',
	modulos: [
		'ui.router',
		'ngResource',
		'ui-notification',
		'angular-loading-bar', 
		'ngAnimate',
		'oc.lazyLoad',
		'oitozero.ngSweetAlert',
		'angular-button-spinner',
		'helpers'
	],
	views: [{
		state: 'apiInicio',
		file: [
			'app/modulos/ctrl/usuariosCtrl.js'
		],
		config: {
			url: '/principal',
			controller: 'usuariosCtrl',
			templateUrl: 'app/modulos/usuarios.html',
		}
	},
	{
		state: 'apiRegistro',
		file: [
			'app/modulos/ctrl/usuariosCtrl.js'
		],
		config: {
			url: '/registros',
			controller: 'usuariosCtrl',
			templateUrl: 'app/modulos/registros.html',
		}
	},
	{
		state: 'apiPerfil',
		file: [
			'app/modulos/ctrl/perfilCtrl.js'
		],
		config: {
			url: '/perfil/:id',
			controller: 'perfilCtrl',
			templateUrl: 'app/modulos/perfil.html',
		}
	}]
};