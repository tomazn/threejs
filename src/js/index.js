// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';

let camera, scene, renderer, geometry, material, mesh, controls;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

    for (var x = 0; x<30; x++){
        for (var y = 0; y<30; y++){
            var geometry = new THREE.BoxGeometry(2,2,2);
            var material = new THREE.MeshBasicMaterial({
                color: Math.floor(Math.random() * 16777215)
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x -= x * 2;
            mesh.position.z -= y * 2;
            mesh.position.y = -2;

            scene.add(mesh);
        }

    }
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

