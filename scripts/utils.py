import math

import numpy as np

from keras.applications.vgg16 import VGG16
from keras.applications.vgg16 import preprocess_input
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array

from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans

import cv2

import lap

import matplotlib.pyplot as plt

def cloud_to_grid( coords ) :
    
    coords = np.copy( coords )
    
    coords_min = coords.min( axis = 0 )
    coords -= coords_min
    
    coords_max = coords.max( axis = 0 )
    coords /= coords_max
    
    n, dim = coords.shape
    
    sides = [math.ceil( math.pow( n, 1 / dim ) )] * dim
    
    n_diff = int( np.prod( sides ) ) - n
    
    coords = np.append( coords, np.random.rand( n_diff, dim ), axis = 0 )
    
    grid = np.meshgrid( *[np.linspace( 0.0, 1.0, side ) for side in sides] )
    grid = np.stack( grid, axis = dim )
    grid = grid.reshape( -1, dim )
    
    cost = cdist( grid, coords, 'sqeuclidean' )
    cost = cost * ( 10000000.0 / cost.max() )
    
    assigns = lap.lapjv( np.copy( cost ) )[2]
    
    coords_grid = grid[assigns]
    coords_grid = coords_grid[:-n_diff]
    coords_grid *= coords_max
    coords_grid += coords_min
    
    return coords_grid

def process_contents( paths, model ) :

    model = VGG16( weights = 'imagenet', include_top = False )

    def _process( path ) :
        print( path )

        x = load_img( path, target_size = ( 224, 224 ) )
        x = img_to_array( x )
        x = np.expand_dims( x, axis = 0 )
        x = preprocess_input( x )

        features = model.predict( x )
        features = features.flatten()

        return features

    embeds = [_process( path ) for path in paths]
    embeds = np.array( embeds )

    return embeds

def process_colors( paths, count ) :
    def _process( path ) :
        print( path )

        img = cv2.imread( path )
        img = cv2.cvtColor( img, cv2.COLOR_BGR2RGB )
        img = cv2.resize( img, ( 300, 300 ), interpolation = cv2.INTER_AREA )
        img = img.reshape( img.shape[0] * img.shape[1], 3 )

        clf = KMeans( n_clusters = count )
        clf.fit( img )

        colors = clf.cluster_centers_
        colors = colors.flatten()

        return colors

    embeds = [_process( path ) for path in paths]
    embeds = np.array( embeds )

    return embeds

def plot_coords( coords, title = '' ) :

    plt.scatter( coords[..., 0], coords[..., 1], s = 4, c = ['black'], alpha = 0.5 )
    plt.title( title )
    plt.show()