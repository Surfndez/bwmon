describe('UsageByYearController tests', function() {
	'use strict';

	var $scope = null,
		data = {id: 11},
		mockBWMonService = {
			getUsageByYear: function() {
				return {
					data: data,
					chartData: {1: data}
				};
			}
		};

	beforeEach(module('BWMonApp.controllers'));
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();

		$scope.chartSeries = [];

		$controller('UsageByYearController', {
			$scope: $scope,
			BWMonService: mockBWMonService,
		});
	}));

	it('should update data with getUsageByYear', inject(function() {
		var expected = data,
			actual = $scope.data;

		expect(expected).toEqual(actual);
	}));

	it('should update chart data with getUsageByYear', inject(function() {
		var expected = {1:data},
			actual = $scope.chartData;

		expect(expected).toEqual(actual);
	}));

	it('should update graph options - series with getUsageByYear', inject(function() {
		var expected = $scope.chartSeries,
			actual = $scope.chartOptions.series;

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with non empty label - x axes', inject(function() {
		var expected = 11,
			actual = $scope.chartOptions.axes.x.labelFunction(1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with empty label - x axes', inject(function() {
		var expected = '',
			actual = $scope.chartOptions.axes.x.labelFunction(1.1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with non empty tootltip - x axes', inject(function() {
		var expected = 11,
			actual = $scope.chartOptions.axes.x.tooltipFormatter(1);

		expect(expected).toEqual(actual);
	}));

	it('should update graph options with empty tootltip - x axes', inject(function() {
		var expected = '',
			actual = $scope.chartOptions.axes.x.tooltipFormatter(1.1);

		expect(expected).toEqual(actual);
	}));

});
