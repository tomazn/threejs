varying vec3 vNormal;
uniform vec3 light;

void main(){
vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}