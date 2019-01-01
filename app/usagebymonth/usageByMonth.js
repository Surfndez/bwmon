/*
 *    Copyright (C) 2010 - 2018 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
		controller: 'UsageByMonthController',
		controllerAs: 'usageByMonthCtrl'
	});
})
.controller('UsageByMonthController', function($scope, dataService, chartService) {
	var ctrl = this,
		reset = function() {
			ctrl.predicate = 'id';
			ctrl.descending = true;
		};

	ctrl.setOrder = function(predicate) {
		ctrl.descending = (ctrl.predicate === predicate) ? !ctrl.descending : true;
		ctrl.predicate = predicate;
	};
	
	ctrl.getOrder = function(predicate) {
		return ctrl.predicate === predicate ? (ctrl.descending ? {desc:true} : {asc: true}): {};
	};

	ctrl.getLabel = function(value) {
		var result = '';
		if (value % 1 === 0 && value >= 0 && value <= 11) {
			result = moment({month: value}).format("MMMM");
		}
		return result;
	};

	$scope.$watch('usageByMonthCtrl.selected', function() {
		var usageData = dataService.getUsageByMonth(ctrl.selected.year);

		ctrl.data = usageData.data.usage;
		ctrl.total = usageData.data.total;
		ctrl.chartData = chartService.getChartData(usageData.data.usage);
		ctrl.chartOptions = chartService.getChartOptions(ctrl.getLabel, ctrl.getLabel);
		ctrl.chartOptions.series[0].type = ctrl.selected.chartType;

		reset();
	}, true);
	
	ctrl.selected = {
		year: dataService.getYears()[0],
		chartType: chartService.getChartTypes()[0]
	};
	reset();

})
;
