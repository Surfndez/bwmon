describe('BWMonApp UsageByMonth feature', function() {
	'use strict';

	var $scope = null,
		years = [10, 5, 6],
		data = {
			usage: 5,
			total: 10
		},
		chartSeries = [{key:1}],
		chartTypes = ['x'],
		chartService,
		chartData = [],
		dataService;

	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));
	beforeEach(module('BWMonApp.UsageByMonth'));

	beforeEach(inject(function($rootScope, $controller, _dataService_, _chartService_){
		$scope = $rootScope.$new();
		$scope.chartSeries = [];
		spyOn($scope, '$watch');

		dataService = _dataService_;
		spyOn(dataService, 'getYears').and.returnValue(years);
		spyOn(dataService, 'getUsageByMonth').and.returnValue({data: data, chartData: chartData});

		chartService = _chartService_;
		spyOn(chartService, 'getChartSeries').and.returnValue(chartSeries);
		spyOn(chartService, 'getChartTypes').and.returnValue(chartTypes);

		$controller('UsageByMonthController', {
			$scope: $scope,
			dataService: dataService,
			chartService: chartService
		});
	}));

	it('should map UsageByMonth route', inject(function($route){
		var route = $route.routes['/UsageByMonth'];
		expect(route.controller).toBe('UsageByMonthController');
		expect(route.templateUrl).toBe('usagebymonth/usageByMonth.tpl.html');
	}));

	it('should update year with getYears first element', inject(function() {
		expect($scope.year).toEqual(years[0]);
	}));

	it('should update data with getUsageByMonth', inject(function() {
		expect($scope.data).toEqual(data.usage);
	}));

	it('should update total with getUsageByMonth', inject(function() {
		expect($scope.total).toEqual(data.total);
	}));

	it('should update chart data with getUsageByMonth', inject(function() {
		expect($scope.chartData).toEqual([]);
	}));

	it('should update graph options with chart series from ChartService', inject(function() {
		expect($scope.chartOptions.series).toEqual(chartSeries);
	}));

	it('should update graph options series type with first chart type from ChartService', inject(function() {
		expect($scope.chartOptions.series[0].type).toEqual(chartTypes[0]);
	}));

	it('should update chart type with first chart type from ChartService', inject(function() {
		expect($scope.chartType).toEqual(chartTypes[0]);
	}));

	it('should update graph options with non empty label - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.labelFunction(1)).toEqual('February');
	}));

	it('should update graph options with empty label - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.labelFunction(1.1)).toEqual('');
	}));

	it('should update graph options with non empty tootltip - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.tooltipFormatter(1)).toEqual('February');
	}));

	it('should update graph options with empty tootltip - x axes', inject(function() {
		expect($scope.chartOptions.axes.x.tooltipFormatter(1.1)).toEqual('');
	}));

});
