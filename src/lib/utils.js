export function lerp( x, a, b, c, d ) {
	return c + ( d - c ) * ( x - a ) / ( b - a );
}

export function lerpi( ...args ) {
	return Math.floor( lerp( ...args ) );
}

export function range( a, b, fn ) {
	return Array.from( { length : ( b - a ) }, ( x, i ) => fn( i + a ) );
}

export function randomFloat( a, b ) {
	return lerp( Math.random(), 0.0, 1.0, a, b );
}

export function randomInt( a, b ) {
	return lerpi( Math.random(), 0.0, 1.0, a, b );
}

export function randomString() {
	return Math.random().toString( 36 ).substring( 2, 15 );
}

export function randomChoice( items ) {
	return items[randomInt( 0, items.length )];
}

export function randomTrue( p ) {
	return ( Math.random() < p );
}

export function times( n, fn ) {
	return Array.from( { length : n }, ( x, i ) => fn( i ) );
}

export function makeCSSTransform( offset, angle ) {
	return `translateX(${ offset }px) rotateZ(${ angle }deg)`;
}