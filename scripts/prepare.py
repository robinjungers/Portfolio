import os
import glob
import json

import numpy as np

from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler

from umap import UMAP

import utils

def prepare(
	dir_data,
	path_cache,
	path_out,
) :
	count = 5

	try :
		data = np.load( path_cache, allow_pickle = True )
		
		paths = data['paths']
		embeds = data['embeds']
	except IOError :
		paths = glob.glob( f'{dir_data}**/*.jpg', recursive = True )
		embeds = utils.process_colors( paths, count )

		np.savez( path_cache, paths = paths, embeds = embeds )

	coords = TruncatedSVD( n_components = 10, algorithm = 'arpack' ).fit_transform( embeds )
	coords = StandardScaler().fit_transform( coords )
	coords = UMAP( output_metric = 'euclidean', n_components = 2, random_state = 42 ).fit_transform( coords )
	coords = MinMaxScaler().fit_transform( coords )
	coords = utils.cloud_to_grid( coords )

	utils.plot_coords( coords )

	def _get_color( i, j ) :
		j1 = 3 * ( j + 0 )
		j2 = 3 * ( j + 1 )
		
		return {
			'rgb' : list( embeds[i, j1:j2] )
		}

	def _get_image( i ) :
		return {
			'path' : os.path.normpath( os.path.relpath( paths[i], dir_data ) ),
			'colors' : list( _get_color( i, j ) for j in range( count ) ),
			'x' : coords[i, 0],
			'y' : coords[i, 1],
		}

	images = list( map( _get_image, range( len( paths ) ) ) )

	with open( path_out, 'w' ) as file :
		json.dump( images, file, indent = 4 )

if __name__ == '__main__' :

	DIR_CURRENT = os.path.dirname( os.path.abspath( __file__ ) )

	def rel_path( path ) :
		return os.path.normpath( os.path.join( DIR_CURRENT, path ) )

	prepare(
		rel_path( '../public/' ),
		rel_path( './images.npz' ),
		rel_path( '../src/assets/images.json' ) )

