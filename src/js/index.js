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
    var earthMaterial = new THREE.MeshPhongMaterial( { color: 0x009fdb, shininess: 90 } );


    earth = new THREE.Mesh( earthGeometry, earthMaterial );

    earth.position.x = 30;

    sun.add(earth);

    scene.add( sun );
    scene.add( earth );

    var light = new THREE.PointLight( 0xffffff, 1, 5000 );
    light.position.set( 0, 0, 0 );
    scene.add( light );

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

function rotateAboutWorldAxis(object, axis, angle) {
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis( axis.normalize(), angle );
    var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1.5);
    var newPos = currentPos.applyMatrix4(rotationMatrix);
    object.position.x = newPos.x;
    object.position.y = newPos.y;
    object.position.z = newPos.z;
}

function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 10; // rotate around its own axis

    var yAxis = new THREE.Vector3(0, 20,0);
    rotateAboutWorldAxis(earth,yAxis,Math.PI / 180);

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

