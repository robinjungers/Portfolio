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
  const colors = [];

  for ( let i = 0; i < array.length; i += 3 ) {
    colors.push( [
      array[i + 0],
      array[i + 1],
      array[i + 2],
    ] );
  }

  const { centroids } = kmeans( colors, 5 );
  const orderedCentroids = centroids.sort( ( a, b ) =>
    chroma( b.centroid ).get( 'lab.l' ) - chroma( a.centroid ).get( 'lab.l') );
  const orderedColors = orderedCentroids.map( centroid => {
    const color = chroma( centroid.centroid );
    const s = color.get( 'hsl.s' );
    const l = color.get( 'hsl.l' );

    const primary = color.css();
    const secondary = color
      .set( 'hsl.s', Math.min( s, 0.15 ) )
      .set( 'hsl.l', Math.max( l, 0.75 ) )
      .css();

    return {
      ratio : centroid.size / colors.length,
      primary,
      secondary,
    };
  } );
	
	return orderedColors
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
    const colors = await preparePalette( image.path );
    const isLight = chroma( colors[0].primary ).luminance() > 0.5;

    return {
      alt : image.alt,
      largeUrl : largeInfo.url,
      largeWidth : largeInfo.width,
      largeHeight : largeInfo.height,
      smallUrl : smallInfo.url,
      smallWidth : smallInfo.width,
      smallHeight : smallInfo.height,
      colors,
      isLight,
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