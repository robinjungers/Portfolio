module.exports = {
	trailingSlash : true,
	serverRuntimeConfig : {
    dirname : __dirname,
  },
  webpack( config ) {
    config.module.rules.push( {
      test : /\.toml$/,
      use : '@lcdev/toml-loader',
    } );

    config.module.rules.push( {
      test : /\.glsl$/,
      type : 'asset/source',
    } );

    return config;
  }
};