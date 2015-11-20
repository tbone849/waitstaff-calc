angular.module('waitstaffCalculator', ['ngMessages', 'ngRoute', 'ngAnimate'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'home.html',
        }).when('/new-meal', {
            templateUrl : 'new-meal.html',
            controller : 'mealDetailsCtrl'
        }).when('/my-earnings', {
            templateUrl : 'my-earnings.html',
            controller : 'mealDetailsCtrl'
        }).otherwise('/');
    }])
    .controller('mealDetailsCtrl', function($scope) {
    	$scope.mealInfo = {
    		mealPrice: null,
    		taxRate: null,
    		tipPercentage: null,
    		subtotal: null,
    		tip: null,
    		totalCost: null,
    		tipTotal: null,
    		mealCount: 0,
    		avgTip: null
    	}

    	var emptyAppCopy = angular.copy($scope.mealInfo);
		

    	function calcSubtotal(mealPrice, taxRate) {
    		var subtotal = mealPrice + (mealPrice * (taxRate/100));
    		return subtotal.toFixed(2);
    	}

    	function calcTip(mealPrice, tipPercentage) {
    		var tip = mealPrice * (tipPercentage/100);
    		return tip.toFixed(2);
    	}

    	function calcTotalCost(subtotal, tip){
    		var total = subtotal*1 + tip*1;
    		return total.toFixed(2);
    	}

    	function calcTipTotal(tipTotal, tip){
    		tipTotal = tipTotal*1 + tip*1;
    		return tipTotal.toFixed(2);
    	}

    	function calcAvgTip(mealCount, tipTotal){
    		var avgTip = tipTotal/mealCount;
    		return avgTip.toFixed(2);
    	}

    	function clearForm(){
    		$scope.mealInfo.mealPrice = null;
    		$scope.mealInfo.taxRate = null;
    		$scope.mealInfo.tipPercentage = null;
            $scope.mealDetails.$submitted = false;
    	}

    	$scope.submit = function (){
    		if($scope.mealDetails.$valid && $scope.mealDetails.$submitted){
    			$scope.mealInfo.mealCount++;
    			$scope.mealInfo.subtotal = calcSubtotal($scope.mealInfo.mealPrice, $scope.mealInfo.taxRate);
    			$scope.mealInfo.tip = calcTip($scope.mealInfo.mealPrice, $scope.mealInfo.tipPercentage);
 				$scope.mealInfo.totalCost = calcTotalCost($scope.mealInfo.subtotal, $scope.mealInfo.tip);
 				$scope.mealInfo.tipTotal = calcTipTotal($scope.mealInfo.tipTotal, $scope.mealInfo.tip);
 				$scope.mealInfo.avgTip = calcAvgTip($scope.mealInfo.mealCount, $scope.mealInfo.tipTotal);
 				clearForm();
	 		}
    	}

    	$scope.clear = function (){
    		clearForm();
    	}

    	$scope.resetApp = function(){
    		$scope.mealInfo = angular.copy(emptyAppCopy);
    	}
	});