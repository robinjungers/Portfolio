export function lerp( x : number, a : number, b : number, c : number, d : number ) : number {
	return c + ( d - c ) * ( x - a ) / ( b - a );
}

export function lerpi( x : number, a : number, b : number, c : number, d : number ) : number {
	return Math.floor( lerp( x, a, b, c, d ) );
}

export function range<T>( a : number, b : number, fn : ( v : number ) => T ) : T[] {
	return times<T>( b - a, ( i ) => fn( i + a ) );
}

export function randomFloat( a : number, b : number ) : number {
	return lerp( Math.random(), 0.0, 1.0, a, b );
}

export function randomInt( a : number, b : number ) : number {
	return lerpi( Math.random(), 0.0, 1.0, a, b );
}

export function randomString() : string {
	return Math.random().toString( 36 ).substring( 2, 15 );
}

export function randomChoice<T>( items : T[] ) : T {
	return items[randomInt( 0, items.length )];
}

export function randomTrue( p : number ) : boolean {
	return ( Math.random() < p );
}

export function times<T>( n : number, fn : ( i : number ) => T ) : T[] {
	return Array.from( { length : n }, ( x, i ) => fn( i ) );
}

export function makeCSSTransform( offset : number, angle : number ) : string {
	return `translateX(${ offset }px) rotateZ(${ angle }deg)`;
}