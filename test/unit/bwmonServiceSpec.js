describe('BWMonApp.services BWMonService', function() {
	'use strict';

	var BWMonService = null;

	beforeEach(module('BWMonApp.services'));
	beforeEach(inject(function(_BWMonService_){
		BWMonService =_BWMonService_;
	}));

	it('should return years', function() {
		var expected = [2013, 2012, 2011, 2010],
			actual = BWMonService.getYears();

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return months', function() {
		var expected = [ 'November', 'October', 'September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January' ],
			actual = BWMonService.getMonths(2013);

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return data by year', function() {
		var expected = [
				{id: 2013, download: 603928097, upload: 35772955, total: 639701052, average: 1752605.622, days: 365},
				{id: 2012, download: 413484937, upload: 23242362, total: 436727299, average: 1193243.986, days: 366},
				{id: 2011, download: 139938627, upload: 10744984, total: 150683611, average: 412831.811, days: 365},
				{id: 2010, download: 0, upload: 0, total: 0, average: 0, days: 365}
			],
			actual = BWMonService.getUsageByYear().data;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return chart data by year', function() {
		var expected = [
				{x: 0, id: 2010, total: 0},
				{x: 1, id: 2011, total: 150.684},
				{x: 2, id: 2012, total: 436.727},
				{x: 3, id: 2013, total: 639.701}
			],
			actual = BWMonService.getUsageByYear().chartData;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return usage data by month', function() {
		var expected = [
				{id: 11, download: 21926209, upload: 1936607, total: 23862816, average: 769768.258, days: 31},
				{id: 10, download: 10920971, upload: 693868, total: 11614839, average: 387161.3, days: 30},
				{id: 9, download: 13960244, upload: 1577944, total: 15538188, average: 501231.871, days: 31},
				{id: 8, download: 14874630, upload: 1162039, total: 16036669, average: 534555.633, days: 30},
				{id: 7, download: 29506551, upload: 1782830, total: 31289381, average: 1009334.871, days: 31},
				{id: 6, download: 21800593, upload: 1506038, total: 23306631, average: 751826.806, days: 31},
				{id: 5, download: 26949429, upload: 2085658, total: 29035087, average: 967836.233, days: 30}
			],
			actual = BWMonService.getUsageByMonth(2011).data.usage;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return total by month', function() {
		var expected = {id: 2011, download: 139938627, upload: 10744984, total: 150683611, average: 412831.811, days: 365},
			actual = BWMonService.getUsageByMonth(2011).data.total;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return chart usage by month', function() {
		var expected = [
				{x: 0, id: 5, total: 29.035},
				{x: 1, id: 6, total: 23.307},
				{x: 2, id: 7, total: 31.289},
				{x: 3, id: 8, total: 16.037},
				{x: 4, id: 9, total: 15.538},
				{x: 5, id: 10, total: 11.615},
				{x: 6, id: 11, total: 23.863}
			],
			actual = BWMonService.getUsageByMonth(2011).chartData;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return usage data by user', function() {
		var expected = [
				{id:38, IP: '192.168.1.10', MAC: '00:1C:25:27:9B:AE', user: 'COMPUTER-3', download: 7241231, upload: 410184, firstSeen: 1320188401, lastSeen: 1322703002, year: 2011, month: 10, total: 7651415, days: 30, average: 255047.167},
				{id:37, IP: '192.168.1.12', MAC: '00:26:9E:C4:A0:40', user: 'COMPUTER-5', download: 2734650, upload: 246716, firstSeen: 1320184802, lastSeen: 1322701201, year: 2011, month: 10, total: 2981366, days: 30, average: 99378.867},
				{id:34, IP: '192.168.1.14', MAC: '00:24:8D:28:F2:9A', user: 'COMPUTER-1', download: 232214, upload: 6366, firstSeen: 1320519602, lastSeen: 1322361007, year: 2011, month: 10, total: 238580, days: 22, average: 10844.545},
				{id:36, IP: '192.168.1.15', MAC: '00:1A:A0:C7:19:08', user: 'COMPUTER-9', download: 655493, upload: 22010, firstSeen: 1321403402, lastSeen: 1322701201, year: 2011, month: 10, total: 677503, days: 16, average: 42343.938},
				{id:39, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8},
				{id:35, IP: '192.168.1.24', MAC: '00:27:10:0E:B5:60', user: 'COMPUTER-4', download: 56729, upload: 8382, firstSeen: 1322274602, lastSeen: 1322407802, year: 2011, month: 10, total: 65111, days: 2, average: 32555.5}
			],
			actual = BWMonService.getUsageByUser(2011, 'November').data.usage;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return usage data by user with filter using IP', function() {
		var expected = [
				{id:39, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8},
				{id:35, IP: '192.168.1.24', MAC: '00:27:10:0E:B5:60', user: 'COMPUTER-4', download: 56729, upload: 8382, firstSeen: 1322274602, lastSeen: 1322407802, year: 2011, month: 10, total: 65111, days: 2, average: 32555.5}
			],
			actual = BWMonService.getUsageByUser(2011, 'November', '.2').data.usage;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return usage data by user with filter using MAC', function() {
		var expected = [
				{id:37, IP: '192.168.1.12', MAC: '00:26:9E:C4:A0:40', user: 'COMPUTER-5', download: 2734650, upload: 246716, firstSeen: 1320184802, lastSeen: 1322701201, year: 2011, month: 10, total: 2981366, days: 30, average: 99378.867},
				{id:36, IP: '192.168.1.15', MAC: '00:1A:A0:C7:19:08', user: 'COMPUTER-9', download: 655493, upload: 22010, firstSeen: 1321403402, lastSeen: 1322701201, year: 2011, month: 10, total: 677503, days: 16, average: 42343.938},
				{id:39, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8},
			],
			actual = BWMonService.getUsageByUser(2011, 'November', ':A0').data.usage;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return usage data by user with filter using user', function() {
		var expected = [
				{id:39, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8},
			],
			actual = BWMonService.getUsageByUser(2011, 'November', '-2').data.usage;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return total by user', function() {
		var expected = {id: 10, download: 10920971, upload: 693868, total: 11614839, average: 387161.3, days: 30},
			actual = BWMonService.getUsageByUser(2011, 'November').data.total;

		expect(angular.equals(expected, actual)).toBe(true);
	});

	it('should return chart usage by user', function() {
		var expected = [
				{x: 0, id: 38, total: 7.651},
				{x: 1, id: 37, total: 2.981},
				{x: 2, id: 34, total: 0.239},
				{x: 3, id: 36, total: 0.678},
				{x: 4, id: 39, total: 0.001},
				{x: 5, id: 35, total: 0.065}
			],
			actual = BWMonService.getUsageByUser(2011, 'November').chartData;

		expect(angular.equals(expected, actual)).toBe(true);
	});

});
