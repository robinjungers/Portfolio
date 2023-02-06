precision mediump float;

attribute vec3 position;

uniform float uAspect;

varying vec2 uv;

void main( void )
{
    gl_Position = vec4( position, 1.0 );
    
    vec2 aspect = ( uAspect > 1.0 )
        ? vec2( 0.5, 0.5 / uAspect )
        : vec2( 0.5 * uAspect, 0.5 );
    uv = position.xy * aspect;
}
