'use strict';

//**ANGULAR**//
angular.module('ourWedding', ['uiGmapgoogle-maps', 'matchMedia'])
	.directive('ngSglclick', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
              var fn = $parse(attr['ngSglclick']);
              var delay = 300, clicks = 0, timer = null;
              element.on('click', function (event) {
                clicks++;  //count clicks
                if(clicks === 1) {
                  timer = setTimeout(function() {
                    scope.$apply(function () {
                        fn(scope, { $event: event });
                    }); 
                    clicks = 0;             //after action performed, reset counter
                  }, delay);
                  } else {
                    clearTimeout(timer);    //prevent single-click action
                    clicks = 0;             //after action performed, reset counter
                  }
              });
            }
        };
    }])
    .directive('iosDblclick',
        function () {

            const DblClickInterval = 300; //milliseconds

            var firstClickTime;
            var waitingSecondClick = false;

            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind('click', function (e) {

                        if (!waitingSecondClick) {
                            firstClickTime = (new Date()).getTime();
                            waitingSecondClick = true;

                            setTimeout(function () {
                                waitingSecondClick = false;
                            }, DblClickInterval);
                        }
                        else {
                            waitingSecondClick = false;

                            var time = (new Date()).getTime();
                            if (time - firstClickTime < DblClickInterval) {
                                scope.$apply(attrs.iosDblclick);
                            }
                        }
                    });
                }
            };
    	}
    )
	.controller('WeddingCtrl', ['$scope', '$location', '$anchorScroll', 'screenSize', '$window', '$timeout', 
		function($scope, $location, $anchorScroll, screenSize, $window, $timeout) {

			//**PRIVATE**//
			var urlTw = {
				pipit: 'https://twitter.com/fitripipitana',
				ikhsan: 'https://twitter.com/abdfattahikhsan'
			};

			var urlFb = {
				pipit: 'https://www.facebook.com/fitri.ana.716',
				ikhsan: 'https://www.facebook.com/ikhsan.alatsary'
			};

			var urlGplus = {
				pipit: 'https://plus.google.com/113383305409625413541',
				ikhsan: 'https://plus.google.com/+abdulfattahikhsanalatsary'
			};

			var urlInsta = {
				pipit: 'https://www.instagram.com/pipitana/',
				ikhsan: 'https://www.instagram.com/ikhsan_alatsary/'
			};

			function twPipit() {
				openUrl(urlTw.pipit);
			}

			function twIkhsan() {
				openUrl(urlTw.ikhsan);
			}

			function fbPipit() {
				openUrl(urlFb.pipit);
			}

			function fbIkhsan() {
				openUrl(urlFb.ikhsan);
			}

			function gplusIkhsan() {
				openUrl(urlGplus.ikhsan);
			}

			function gplusPipit() {
				openUrl(urlGplus.pipit);
			}

			function instaIkhsan() {
				openUrl(urlInsta.ikhsan);
			}

			function instaPipit() {
				openUrl(urlInsta.pipit);
			}

			function openUrl(url) {
				var openUrl = $window.open(url, '_blank');
				openUrl.focus();
			}


			$window.onload = function() {
				var element = document.getElementById("loading");
				$timeout(function() {
					element.style.display = "none";
				}, 3000);
			}

			function isMobile() {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					return false;
				}
				return true;
			}
			function scrollTo(id) {
				$location.hash(id);
				$anchorScroll();
			}

			function isActive(id) {
				return $location.hash() === id;
			}

			//**[PUBLIC] Export To view**//

			$scope.map = { 
				center: {
				 latitude: -6.245403, 
				 longitude: 107.059932 
				}, 
				zoom: 16,
				options: {
					scrollwheel: false,
					draggable: isMobile()
				}
			};

			$scope.marker = {
				id: 0,
				coords: {
				  latitude: -6.243412699363186, 
				  longitude: 107.06103064119816
				}
			};

			$scope.quotes = [
				{"id":1, "quote":"Akan tetapi sehebat apapun kita merencanakan sesuatu. Tetap rencana Allah adalah sebaik-baiknya rancangan."},
				{"id":2, "quote":"Aku tak berharap kesempurnaanmu. Kerana aku ingin melengkapinya dengan kekuranganku."},
				{"id":3, "quote":"Yang paling sempurna percaya dalam iman adalah orang yang karakter terbaik dan yang paling baik kepada istrinya."},
				{"id":4, "quote":"Selama dalam penantian akan jodoh, perbanyaklah senyum. selama dalam kesendirian perbanyaklah sujud."},
				{"id":5, "quote":"Pantaskan dirimu untuk jodohmu. Karena saat ini ia pun sedang memantaskan dirinya untukmu."},
				{"id":6, "quote":"jodohmu adalah pemberian paling manis dan terbaik yg diberikan Allah padamu."}
			];

			$scope.onload = $window.onload;
			$scope.scrollTo = scrollTo;
			$scope.isActive = isActive;
			$scope.desktop = screenSize.on('md, lg', function(match){
			    $scope.desktop = match;
			});
			$scope.mobile = screenSize.on('xs, sm', function(match){
			    $scope.mobile = match;
			});
			$scope.twIkhsan = twIkhsan;
			$scope.twPipit = twPipit;
			$scope.fbIkhsan = fbIkhsan;
			$scope.fbPipit = fbPipit;
			$scope.gplusPipit = gplusPipit;
			$scope.gplusIkhsan = gplusIkhsan;
			$scope.instaPipit = instaPipit;
			$scope.instaIkhsan = instaIkhsan;
		}
	]);

//**JQUERY**//
$.material.init();
$(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
});