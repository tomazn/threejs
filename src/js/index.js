// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';

import baseFragment from '../shader/base.fragment.glsl';
import baseVertex from '../shader/base.vertex.glsl';

let camera, scene, renderer, geometry, material, mesh, controls;

var head;

function init() {
    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);


    var myUniforme = {
        time : {
            value : 0
        },
        light : {
            value: new THREE.Vector3(0.0,1.0,2.0)
        }
    }

    var sunGeometry = new THREE.SphereBufferGeometry( 2, 32, 32 );
    var sunMaterial = new THREE.ShaderMaterial( {
        uniform : myUniforme,
        vertexShader : baseVertex,
        fragmentShader : baseFragment
    } );
    head = new THREE.Mesh( sunGeometry, sunMaterial );


    head.position.y = 0;
    head.position.z = 0;
    head.position.x = 0;

    scene.add( head );

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

    setTimeout(function(){
        var audio = new Audio(tsukuyomi);
        audio.play();
    })

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

