angular.module('ourWedding', ['uiGmapgoogle-maps'])
	.controller('WeddingCtrl', function($scope) {
		$scope.map = { 
			center: {
			 latitude: -6.245403, 
			 longitude: 107.059932 
			}, 
			zoom: 16
		};

		$scope.marker = {
			id: 0,
			coords: {
			  latitude: -6.243412699363186, 
			  longitude: 107.06103064119816
			}
		}
	});