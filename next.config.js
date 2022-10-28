module.exports = {
	trailingSlash : true,
	serverRuntimeConfig : {
    dirname : __dirname,
  },
  webpack( config ) {
    config.module.rules.push( {
      test : /\.toml$/,
      use : { loader : '@lcdev/toml-loader' },
    } );

    return config;
  }
};