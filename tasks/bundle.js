const path = require('path');
const jetpack = require('fs-jetpack');
const rollup = require('rollup').rollup;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias');
const vue = require('rollup-plugin-vue');
const process = require('process');

const cached = {};

module.exports = (src, dest, opts) => {
	const options = opts || {};

	const plugins = [
		// Add rollup plugins here
		,alias({
			'vue': 'node_modules/vue/dist/vue.esm.js'
			,'vue-router': 'node_modules/vue-router/dist/vue-router.esm.js'
		})
		,vue({
			css: true
		}),
		,resolve({
			module: true
			,jsnext: true
			,main: true
		})
		,commonjs({
			include: 'node_modules/**'
		})
		,replace({
			'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
		})
	];

	return rollup({
		entry: src,
		cache: cached[src],
		plugins: plugins.concat(options.rollupPlugins || []),
	})
	.then((bundle) => {
		cached[src] = bundle;

		const jsFile = path.basename(dest);
		const result = bundle.generate({
			format: 'cjs',
			sourceMap: true,
			sourceMapFile: jsFile,
		});
		// Wrap code in self invoking function so the constiables don't
		// pollute the global namespace.
		const isolatedCode = `(function () {${result.code}\n}());`;
		return Promise.all([
			jetpack.writeAsync(dest, `${isolatedCode}\n//# sourceMappingURL=${jsFile}.map`),
			jetpack.writeAsync(`${dest}.map`, result.map.toString()),
		]);
	});
};