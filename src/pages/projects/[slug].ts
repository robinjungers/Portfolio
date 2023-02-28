import getConfig from 'next/config'
import fs from 'fs';
import path from 'path';
import sharp, { Metadata, OutputInfo } from 'sharp';
import kmeans from 'ml-kmeans';
import chroma from 'chroma-js';
import { Project, ProjectImageInfo } from '@/interfaces';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ProjectPageProps } from '@/components/ProjectPage';

async function fileExists( path : string ) : Promise<boolean> {
	try {
    await fs.promises.access( path );

    return true;
  } catch {
    return false;
  }
}

type BaseImage = {
  url : string;
  width : number;
  height : number;
}

type BasePalette = {
  color1 : string;
  color2 : string;
};

type ProjectPageSlug = {
  slug : string;
}

const projects = require( '@/lib/projects.toml' ).projects as any[];

async function prepareImage( filename : string, size : number ) : Promise<BaseImage> {
  const sourceDir = path.join( getConfig().serverRuntimeConfig.dirname, 'public/images' )
  const sourcePath = path.join( sourceDir, filename );
  const sourceBasename = path.basename( filename, path.extname( filename ) );
  const targetName = `${ sourceBasename }-${ size }.jpg`;
  const targetPath = path.join( sourceDir, targetName );
  const targetExists = await fileExists( targetPath );
  const targetUrl = path.join( '/images', targetName );

  let info : Metadata | OutputInfo;

  if ( targetExists ) {
    info = await sharp( targetPath ).metadata();
  } else {
    info = await new Promise<OutputInfo>( ( resolve, reject ) => {
      sharp( sourcePath )
        .resize( size )
        .toFile( targetPath, ( error, info ) =>
          ( !!error )
            ? reject( error )
            : resolve( info ) );
    } );
  }

  return {
    url : targetUrl,
    width : info.width,
    height : info.height,
  };
}

async function preparePalette( filename ) : Promise<BasePalette> {
  const sourceDir = path.join( getConfig().serverRuntimeConfig.dirname, 'public/images' );
  const sourcePath = path.join( sourceDir, filename );
  const buffer = await sharp( sourcePath )
    .resize( 500 )
    .removeAlpha()
    .raw()
    .toBuffer();
  const array = new Uint8Array( buffer );
  const pixels = [] as number[][];

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
    .set( 'hsl.s', Math.min( diffColor1Raw.get( 'hsl.s' ), 0.10 ) )
    .set( 'hsl.l', Math.max( diffColor1Raw.get( 'hsl.l' ), 0.75 ) );
	
	return {
    color1 : diffColor1.css(),
    color2 : topColor.css(),
  };
}

export function getStaticPaths() : GetStaticPathsResult<ProjectPageSlug> {
  return {
    fallback : false,
    paths : projects.map( project => ( {
      params : {
        slug : project.slug,
      },
    } ) ),
  };
}

export async function getStaticProps( ctx : GetStaticPropsContext ) : Promise<GetStaticPropsResult<ProjectPageProps>> {
  const project = projects.find( project => project.slug === ctx.params.slug );
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
      project : {
        ...( project as Project ),
        images : images as ProjectImageInfo[],
      },
    },
  };
}

export { default } from '@/components/ProjectPage';