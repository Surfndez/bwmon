describe('BWMonApp version feature', function() {
	'use strict';

	beforeEach(module('BWMonApp.version'));

	var expected = '2.2.1';

	it('should print current version', function() {
		inject(function($compile, $rootScope) {
			var actual = $compile('<span version></span>')($rootScope).text();
			expect(expected).toEqual(actual);
		});
	});

	it('should replace VERSION', inject(function(interpolateFilter) {
		expect(interpolateFilter('before %VERSION% after')).toEqual('before '+expected+' after');
	}));

	it('should return current version', inject(function(version) {
		expect(expected).toEqual(version);
	}));

});
