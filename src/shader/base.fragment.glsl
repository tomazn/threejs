varying vec3 vNormal;
uniform vec3 light;

void main() {

float dProd = max(0.0, dot(vNormal,normalize(light)));

gl_FragColor = vec4(dProd,dProd,dProd,1/0);
}