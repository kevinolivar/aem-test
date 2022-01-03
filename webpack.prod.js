const { merge }               = require('webpack-merge');
const CssMinimizerPlugin      = require("css-minimizer-webpack-plugin");
const TerserPlugin            = require('terser-webpack-plugin');
const common                  = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({}),
            new CssMinimizerPlugin({
                minimizerOptions: {
                preset: [
                    "default",
                    {
                    calc: true,
                    convertValues: true,
                    discardComments: {
                        removeAll: true,
                    },
                    discardDuplicates: true,
                    discardEmpty: true,
                    mergeRules: true,
                    normalizeCharset: true,
                    reduceInitial: true, // This is since IE11 does not support the value Initial
                    svgo: true,
                    },
                ],
                },
                minify: [
                    CssMinimizerPlugin.cssnanoMinify,
                    CssMinimizerPlugin.cleanCssMinify,
                ],
            }),
        ],
        splitChunks: {
            cacheGroups: {
                main: {
                    chunks: 'all',
                    name: 'site',
                    test: 'main',
                    enforce: true
                }
            }
        }
    },
    devtool: false,
    performance: { hints: false }
});
