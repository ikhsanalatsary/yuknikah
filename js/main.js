angular.module('ourWedding', ['uiGmapgoogle-maps'])
	.controller('WeddingCtrl', function($scope) {
		$scope.map = { center: { latitude: -6.2454024, longitude: 107.0577429 }, zoom: 15 };
	});