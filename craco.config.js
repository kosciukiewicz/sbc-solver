const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        /* tsConfigPath should point to the file where "paths" are specified */
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  configure: {
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        chunks(chunk) {
          return false
        },
      },
    },
    output: {
      publicPath: './'
    }
  }
};
