/*
 *    Copyright (C) 2010 - 2015 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
angular.module('BWMonApp.UsageByMonth', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider.when('/UsageByMonth', {
		templateUrl: 'usagebymonth/usageByMonth.tpl.html',
		controller: 'UsageByMonthController'
	});
})
.directive('monthForm', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<form class="form-inline">'+
			'<display-type ng-model="displayType"/></display-type>'+
			'<div class="form-group">'+
				'<label class="sr-only" for="year">Year</label>'+
				'<select-year ng-model="selected.year" class="form-control" name="year"/>'+
			'</div>'+
			'<div ng-if="displayType" class="form-group">'+
				'<label class="sr-only" for="chartType">Chart Type</label>'+
				'<chart-type ng-model="selected.chartType" class="form-control" name="chartType"/>'+
			'</div>'+
			'</form>'
	};
})
.directive('monthTable', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-if="!displayType" class="table-responsive">'+
			'<table class="table table-striped table-hover table-condensed">'+
			'<thead><tr month-header></tr></thead>'+
			'<tbody><tr month-body ng-repeat="current in data | orderBy:predicate:reverse"></tr></tbody>'+
			'<tfoot><tr month-footer></tr></tfoot>'+
			'</table>'+
			'</div>'
	};
})
.directive('monthHeader', function() {
	return {
		template: '<th><a href="" ng-click="predicate=\'id\'; reverse=!reverse;">Month</a></th>'+
			'<th class="text-right">Down</th>'+
			'<th class="text-right">Up</th>'+
			'<th class="text-right"><a href="" ng-click="predicate=\'total\'; reverse=!reverse">Total</a></th>'+
			'<th class="text-right">Percent</th>'+
			'<th class="text-right">Average</th>'+
			'<th class="text-right">Days</th>'
	};
})
.directive('monthBody', function() {
	return {
		template: '<td>{{::current.id | toMonth}}</td>'+
			'<td class="text-right">{{::current.download | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.upload | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.total | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.percent | number:1}}%</td>'+
			'<td class="text-right">{{::current.average | usageInGBytes | number:3}}</td>'+
			'<td class="text-right">{{::current.days}}</td>'
	};
})
.directive('monthFooter', function() {
	return {
		template: '<th>{{selected.year}} Totals</th>'+
			'<th class="text-right">{{::total.download | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.upload | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.total | usageInGBytes | number:3}}</th>'+
			'<th></th>'+
			'<th class="text-right">{{::total.average | usageInGBytes | number:3}}</th>'+
			'<th class="text-right">{{::total.days}}</th>'
	};
})
.directive('chartDisplay', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div ng-if="displayType"><linechart id="chartData" data="chartData" options="chartOptions"></linechart></div>'
	};
})
.controller('UsageByMonthController', function($scope, dataService, chartService) {
	$scope.displayType = false;
	$scope.selected = {};
	$scope.predicate = 'id';
	$scope.reverse = true;

	$scope.$watch('selected.year', function() {
		var usageData = dataService.getUsageByMonth($scope.selected.year);

		$scope.data = usageData.data.usage;
		$scope.total = usageData.data.total;
		$scope.chartData = usageData.chartData;
		$scope.chartOptions = chartService.getChartOptions($scope.chartData, chartService.getMonthLabel, chartService.getMonthLabel);
	}, true);

	$scope.$watch('selected.chartType', function() {
		$scope.chartOptions.series[0].type = $scope.selected.chartType;
	}, true);

});
