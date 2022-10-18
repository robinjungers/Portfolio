import getConfig from 'next/config'
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import projects from '@/lib/projects';
import kmeans from 'ml-kmeans';
import chroma from 'chroma-js';

async function fileExists( path ) {
	try {
    await fs.promises.access( path );

    return true
  } catch {
    return false
  }
}

async function prepareImage( filename, size ) {
  const sourceDir = path.join( getConfig().serverRuntimeConfig.dirname, 'public/images' )
  const sourcePath = path.join( sourceDir, filename );
  const sourceBasename = path.basename( filename, path.extname( filename ) );
  const targetName = `${ sourceBasename }-${ size }.jpg`;
  const targetPath = path.join( sourceDir, targetName );
  const targetExists = await fileExists( targetPath );
  const targetUrl = path.join( '/images', targetName );

  let info;

  if ( targetExists ) {
    info = await sharp( targetPath ).metadata()
  } else {
    info = await new Promise( ( resolve, reject ) => {
      sharp( sourcePath )
        .resize( size )
        .toFile( targetPath, ( error, info ) =>
          error ? reject( error ) : resolve( info ) );
    } );
  }

  return {
    url : targetUrl,
    width : info.width,
    height : info.height,
  };
}

async function preparePalette( filename ) {
  const sourceDir = path.join( getConfig().serverRuntimeConfig.dirname, 'public/images' )
  const sourcePath = path.join( sourceDir, filename );
  const buffer = await sharp( sourcePath )
    .resize( 500 )
    .removeAlpha()
    .raw()
    .toBuffer();
  const array = new Uint8Array( buffer );
  const pixels = [];

  for ( let i = 0; i < array.length; i += 3 ) {
    pixels.push( [
      array[i + 0],
      array[i + 1],
      array[i + 2],
    ] );
  }

  const { centroids } = kmeans( pixels, 5 );
  const colors = centroids.map( centroid =>( {
    ratio : centroid.size / pixels.length,
    color : chroma( centroid.centroid ),
  } ) );

  const topColors = [...colors].sort( ( a, b ) => b.ratio - a.ratio );
  const topColor = chroma( topColors[0].color );
  const diffColors = [...colors].sort( ( a, b ) => (
      chroma.contrast( b.color, topColor ) -
      chroma.contrast( a.color, topColor ) ) );
  const diffColor1Raw = chroma( diffColors[0].color );
  const diffColor1 = diffColor1Raw
    .set( 'hsl.s', Math.min( diffColor1Raw.get( 'hsl.s' ), 0.05 ) )
    .set( 'hsl.l', Math.max( diffColor1Raw.get( 'hsl.l' ), 0.75 ) );
  const diffColor2Raw = chroma( diffColors[1].color );
  const diffColor2 = diffColor2Raw
    .set( 'hsl.s', Math.min( diffColor2Raw.get( 'hsl.s' ), 0.10 ) )
    .set( 'hsl.l', Math.min( diffColor2Raw.get( 'hsl.l' ), 0.25 ) );
	
	return {
    color1 : diffColor1.css(),
    color2 : diffColor2.css(),
  };
}

export async function getStaticPaths() {
  return {
    fallback : false,
    paths : projects.map( project => ( {
      params : {
        slug : project.slug,
      },
    } ) ),
  };
}

export async function getStaticProps( { params } ) {
  const project = projects.find( project => project.slug === params.slug );
  const images = await Promise.all( project.images.map( async image => {
    const largeInfo = await prepareImage( image.path, 2000 );
    const smallInfo = await prepareImage( image.path, 64 );
    const palette = await preparePalette( image.path );

    return {
      alt : image.alt,
      largeUrl : largeInfo.url,
      largeWidth : largeInfo.width,
      largeHeight : largeInfo.height,
      smallUrl : smallInfo.url,
      smallWidth : smallInfo.width,
      smallHeight : smallInfo.height,
      color1 : palette.color1,
      color2 : palette.color2,
    };
   } ) );

  return {
    props : {
      slug : project.slug,
      title : project.title,
      headline : project.headline,
      texts : project.texts,
      roles : project.roles,
      images,
    },
  }
}

export { default } from '@/components/Project';