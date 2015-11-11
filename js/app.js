angular.module('waitstaffCalculator', ['ngMessages'])
    .controller('mealDetailsCtrl', function($scope) {
    	$scope.mealInfo = {
    		mealPrice: null,
    		taxRate: null,
    		tipPercentage: null,
    		subtotal: null,
    		tip: null,
    		totalCost: null
    	}
		

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

    	$scope.submit = function (){
    		$scope.mealInfo.subtotal = calcSubtotal($scope.mealInfo.mealPrice, $scope.mealInfo.taxRate);
    		$scope.mealInfo.tip = calcTip($scope.mealInfo.mealPrice, $scope.mealInfo.tipPercentage);
 			$scope.mealInfo.totalCost = calcTotalCost($scope.mealInfo.subtotal, $scope.mealInfo.tip);
    	}
	});