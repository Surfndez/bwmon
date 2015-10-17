describe('BWMonApp.UsageByMonth module, ', function() {
	var scope;

	beforeEach(module('BWMonApp.UsageByMonth'));
	beforeEach(module('BWMonApp.DataService'));
	beforeEach(module('BWMonApp.ChartService'));

	beforeEach(inject(function($rootScope){
		scope = $rootScope.$new();
	}));

	describe('config ', function() {
		it('should map UsageByMonth route', inject(function($route){
			var route = $route.routes['/UsageByMonth'];
			expect(route.controller).toBe('UsageByMonthController');
			expect(route.controllerAs).toBe('usageByMonthCtrl');
			expect(route.templateUrl).toBe('usagebymonth/usageByMonth.tpl.html');
		}));
	});

	describe('UsageByMonthController controller ', function() {
		var	controller,
			usageData = {
				data: {
					usage: 5,
					total: 10
				},
				chartData: 23
			},
			chartOptions = {
				series: [{
					type: 'type'
				}]
			},
			chartService,
			dataService;

		beforeEach(inject(function(_$controller_, _dataService_, _chartService_){
			dataService = _dataService_;
			spyOn(dataService, 'getUsageByMonth').and.returnValue(usageData);

			chartService = _chartService_;
			spyOn(chartService, 'getChartOptions').and.returnValue(chartOptions);

			controller = _$controller_('UsageByMonthController', {
				$scope: scope,
				dataService: dataService,
				chartService: chartService
			});
		}));

		it('should update data with getUsageByMonth', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.data).toEqual(usageData.data.usage);
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});

		it('should update total with getUsageByMonth', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.total).toEqual(usageData.data.total);
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});

		it('should update chart data with getUsageByMonth', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.chartData).toEqual(usageData.chartData);
			expect(dataService.getUsageByMonth).toHaveBeenCalledWith(controller.selected.year);
		});

		it('should update chart options with chart options from ChartService', function() {
			controller.selected.year = 1;
			scope.$digest();
			expect(controller.chartOptions).toEqual(chartOptions);
			expect(chartService.getChartOptions).toHaveBeenCalledWith(controller.chartData, chartService.getMonthLabel, chartService.getMonthLabel);
		});

		it('should change chart type in chart options', function() {
			controller.selected.chartType = 'test';
			scope.$digest();
			expect(controller.chartOptions.series[0].type).toEqual(controller.selected.chartType);
		});
	});
});
