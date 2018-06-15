uniform float time;
uniform vec3 light;

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}