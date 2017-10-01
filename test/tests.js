'use strict';

var inspect = require('object-inspect');
var forEach = require('foreach');

module.exports = function (flatMap, t) {
	t.test('callback function', function (st) {
		forEach([[], {}, true, false, 42, 'foo', /a/g, null], function (nonFunction) {
			st['throws'](
				function () { flatMap([], nonFunction); },
				TypeError,
				inspect(nonFunction) + ' is not a function'
			);
		});

		st.end();
	});

	t.test('flatMaps', function (st) {
		var mapped = flatMap([1, [2], [3, 4]], function (x, i) {
			return [x, i];
		});

		st.deepEqual(mapped, [1, 0, [2], 1, [3, 4], 2], 'array is flattened and mapped to tuples of item/index');

		st.end();
	});
};
