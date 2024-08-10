import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui';

import { GLTFLoader, DRACOLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
scene.add(directionalLight)

scene.environment = new THREE.CubeTextureLoader()
  .setPath('https://sbcode.net/img/')
  .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()

const loader = new GLTFLoader()

const dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('/examples/jsm/libs/draco/')
loader.setDRACOLoader(dracoLoader)

loader.load('./Braid_Raiz_Rig_New_Texture_Two.glb', function (gltf) {
		scene.add(gltf.scene);
    gltf.userData;
		gltf.animations;
		gltf.scene;
		gltf.scenes;
		gltf.cameras;
		gltf.asset;
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100 ) + '% loaded');
	},
	function (error) {
		console.log('An error happened');
	}
);

const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 20)
cameraFolder.open()

const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', function () {
//   renderer.render(scene, camera)
// })

function animate() {
  stats.update()
  renderer.render(scene, camera);
}

// renderer.render(scene, camera)

renderer.setAnimationLoop(animate);
