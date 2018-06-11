// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';

let camera, scene, renderer, geometry, material, mesh, controls;

var earth,sun;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    var sunGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
    var sunMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sun = new THREE.Mesh( sunGeometry, sunMaterial );

    var earthGeometry = new THREE.SphereBufferGeometry( 2, 32, 32  );
    var earthMaterial = new THREE.MeshBasicMaterial( {color: 0x009fdb} );
    earth = new THREE.Mesh( earthGeometry, earthMaterial );

    earth.position.x = 30;

    sun.add(earth);

    scene.add( sun );
    scene.add( earth );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    // pointer lock
    var pointerlockchange = function (event) {
        if (document.pointerLockElement == element) {
            controls.enabled = true;
        } else {
            controls.enabled = false;
        }
    };
    var pointerlockerror = function (event) {};

    // hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);
    var element = document.body;

    element.addEventListener('click', function () {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
    }, false);

}

const clock = new THREE.Clock();

var keys = [];

document.onkeydown = function(e){
    e = e || window.event;
    keys[e.keyCode] = true;
};

document.onkeyup = function(e){
    e = e || window.event;
    keys[e.keyCode] = false;
};


function animate() {
    requestAnimationFrame(animate);

    var sphereContainer = new THREE.Object3D();
    sphereContainer.add( earth );
    sphereContainer.position.copy( sun.position );

    scene.add( sphereContainer );

    earth.rotation.y += 10; // rotate around its own axis
    sphereContainer.rotation.y += 10; // rotate around cube

    var delta = clock.getDelta();
    var speed = 10;

    //up
    if(keys[38]){
        controls.getObject().translateZ(-delta * speed);
    }

    //down
    if(keys[40]){
        controls.getObject().translateZ(delta * speed);
    }

    //left
    if(keys[37]){
        controls.getObject().translateX(-delta * speed);
    }

    //right
    if(keys[39]){
        controls.getObject().translateX(delta * speed);
    }

    renderer.render(scene, camera);


}

// window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

init();
animate();

/*
var texture = THREE.TextureLoader().load('path');
var material = new THREE.MeshBasicMaterial({
    map : texture
})
*/