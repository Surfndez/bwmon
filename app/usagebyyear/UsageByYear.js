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
angular.module('BWMonApp.UsageByYear', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	'use strict';
	$routeProvider.when('/UsageByYear', {
		templateUrl: 'usagebyyear/UsageByYear.tpl.html',
		controller: 'UsageByYearController'
	});
}])
.controller('UsageByYearController', ['$scope', 'BWMonService', function($scope, BWMonService) {
	'use strict';

	var getLabel = function(value, data) {
			var result = '';
			if (value % 1 === 0 && typeof data[value] !== 'undefined' && data[value] !== null) {
				result = data[value].id;
			}
			return result;
		},
		usageData = BWMonService.getUsageByYear();

	$scope.data = usageData.data;
	$scope.chartData = usageData.chartData;
	$scope.chartOptions = {
		series: $scope.chartSeries,
		axes: {
			x: {
				labelFunction: function(value) {
					return getLabel(value, $scope.chartData);
				},
				tooltipFormatter: function(value) {
					return getLabel(value, $scope.chartData);
				}
			}
		}
	};
	$scope.predicate = 'id';
	$scope.reverse = true;
}]);
