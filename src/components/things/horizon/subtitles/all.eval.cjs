const fs = require( 'fs/promises' );
const path = require( 'path' );
const srtParser2 = require( 'srt-parser-2' ).default;

const keywords = ['black hole', 'gravity', 'sun', 'star', 'planet', 'atom', 'earth', 'space', 'ブラックホール', '重力'];

async function readSrtFile( filename ) {
  const source = await fs.readFile( path.join( __dirname, filename ), 'utf8' );
  const data = new srtParser2().fromSrt( source );

  return data;
}

module.exports = async function() {
  const sources = await Promise.all( [
    readSrtFile( 'interstellar.en.srt' ),
    readSrtFile( 'interstellar.jp.srt' ),
  ] );

  const containsKeyword = ( line ) => keywords.some( keyword => line.text.split( ' ' ).includes( keyword ) );
  const getText = ( line ) => line.text;

  const lines = sources
    .flat()
    .filter( containsKeyword )
    .map( getText );
  
  return {
    code : `module.exports = ${JSON.stringify( lines )};`,
    cacheable : false,
  };
}