// three.js
import * as THREE from 'three';

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000);
camera.position.z = 1000;

var scene = new THREE.Scene();

var parent = new THREE.Mesh(new THREE.BoxGeometry(200,200,200), new THREE.MeshBasicMaterial({color: 0xff0000}));

var child = new THREE.Mesh(new THREE.BoxGeometry(200,200, 200), new THREE.MeshBasicMaterial({color: 0x00ff00}));

child.position.x = 300;

scene.add(parent);
parent.add(child);

new THREE.Object3D();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

renderer.render(scene,camera);

function animate(){

    requestAnimationFrame(animate);

    child.rotation.x += 0.01;
    child.rotation.y += 0.01;

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