// three.js
import * as THREE from 'three';

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000);
camera.position.z = 1000;

var geometry = new THREE.BoxGeometry(200,200,200);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});

var mesh = new THREE.Mesh(geometry,material);

var scene = new THREE.Scene();
scene.add(mesh);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

renderer.render(scene,camera);

function animate(){
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    onmousedown = function(e){
        onmousemove = function(e){
            mesh.position.x = e.pageX - 540;
            mesh.position.y = -e.pageY + 300;
        }
    }

    onmouseup = function(e){
        onmousemove = function(e){

        }
    }

    renderer.render(scene,camera);
}

animate();

