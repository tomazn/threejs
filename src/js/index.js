// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100000);
camera.position.z = 30;
camera.position.y = 10;
camera.position.x = -30;

var scene = new THREE.Scene();

for(var x =0;x<30;x++){
    for(var y=0;y<30;y++){
        var geometry = new THREE.BoxGeometry(2,2,2);
        var material = new THREE.MeshBasicMaterial({
            color: Math.floor(Math.random() * 16777215)
        });
        var mesh = new THREE.Mesh(geometry,material);
        mesh.position.x -= x*2;
        mesh.position.z -= y*2;
        mesh.position.y = -2;

        scene.add(mesh);
    }
}

new THREE.Object3D();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

renderer.render(scene,camera);


//Mouse view controls
var controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());