var lookWebApp = angular.module('lookWebApp', []);

lookWebApp.controller('mainCtrl', ['$scope',function($scope){
	$scope.images = [];

	function generateImages(){
		for(var i=1; i < 26; i++){
		    $scope.images.push('/images/'+i+'.jpeg')
		}
	}
	generateImages();

	$scope.selectImage = function(image){
		$scope.selectedImage = image;
	}
}])