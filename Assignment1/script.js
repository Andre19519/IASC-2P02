import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.9, 3.5, 10.5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS
// Cones/Tents
const coneGeometry = new THREE.ConeGeometry(1, 1.7);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
cone.position.set(6, 0.5, 0)
cone.rotation.y = Math.PI / 4
cone.castShadow = true
scene.add(cone)

const coneGeometry2 = new THREE.ConeGeometry(1, 2);
const coneMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone2 = new THREE.Mesh(coneGeometry2, coneMaterial2);
cone2.position.set(8, 0.5, 1)
cone2.rotation.y = Math.PI / 5
cone2.castShadow = true;
scene.add(cone2)

const coneGeometry3 = new THREE.ConeGeometry(1, 1.7);
const coneMaterial3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone3 = new THREE.Mesh(coneGeometry3, coneMaterial3);
cone3.position.set(6, 0.5, 2)
cone3.rotation.y = Math.PI / 2
cone3.castShadow = true;
scene.add(cone3)

const coneGeometry4 = new THREE.ConeGeometry(1, 1.3);
const coneMaterial4 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone4 = new THREE.Mesh(coneGeometry4, coneMaterial4);
cone4.position.set(7, 0.5, 3)
cone4.rotation.y = Math.PI / 2
cone4.castShadow = true;
scene.add(cone4)

const coneGeometry5 = new THREE.ConeGeometry(1, 2.);
const coneMaterial5 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone5 = new THREE.Mesh(coneGeometry5, coneMaterial5);
cone5.position.set(6, 0.5, -4)
cone5.rotation.y = Math.PI / 2
cone5.castShadow = true;
scene.add(cone5)

const coneGeometry6 = new THREE.ConeGeometry(1, 3);
const coneMaterial6 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone6 = new THREE.Mesh(coneGeometry6, coneMaterial6);
cone6.position.set(6, 0.5, -2)
cone6.rotation.y = Math.PI / 2
cone6.castShadow = true;
scene.add(cone6)

const coneGeometry7 = new THREE.ConeGeometry(1, 1.5);
const coneMaterial7 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone7 = new THREE.Mesh(coneGeometry7, coneMaterial7);
cone7.position.set(8, 0.5, -3)
cone7.rotation.y = Math.PI / 2
cone7.castShadow = true;
scene.add(cone7)

// Ground shadow
const cubeGeometry = new THREE.BoxGeometry( 5, 1.2, 10 ); 
const cubeMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial )
cube.position.set(7, -1, 0)
cube.castShadow = true
scene.add(cube)


// Spheres/Clouds
const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), cloudMaterial);
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), cloudMaterial);
const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), cloudMaterial);

sphere1.position.set(6, 3, 5);
sphere2.position.set(6, 2.9, 4.6);
sphere3.position.set(6, 2.7, 5);




scene.add(sphere1, sphere2, sphere3);

// Capsules/Raindrops

const capsuleGeometry = new THREE.CapsuleGeometry( 0.2, 0.2, 4, 8 ); 
const capsuleMaterial = new THREE.MeshBasicMaterial( {color:0x336699} )


const capsule1 = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
const capsule2 = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
const capsule3 = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
const capsule4 = new THREE.Mesh(capsuleGeometry, capsuleMaterial)

scene.add(capsule1)
scene.add(capsule2)
scene.add(capsule3)
scene.add(capsule4)

capsule1.position.set(6, 2.6, 0 )
capsule2.position.set(6, 2.6, 1 )
capsule3.position.set(6, 2.6, -1 )
capsule4.position.set(6, 2.6, 2 )

capsule1.visible=false
capsule2.visible=false
capsule3.visible=false
capsule4.visible=false





// SUN
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)


/***********
** LIGHTS **
************/
/*
// Ambient Light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
*/

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10, 2.5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)


/*********************
** DOM INTERACTIONS **
**********************/
// domObject
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// continue-reading
document.querySelector('#continue-reading').onclick = function () {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

// restart
document.querySelector('#restart').onclick = function () {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    // reset state
    window.location.reload();

    // reset directionalLight
    directionalLight.position.set(10, 2.5, 0)
}

// first change
document.querySelector('#first-change').onclick = function () {
    domObject.firstChange = true
}

// second change
document.querySelector('#second-change').onclick = function () {
    domObject.secondChange = true
}

// third change
document.querySelector('#third-change').onclick = function () {
    domObject.thirdChange = true
}

// fourth change
document.querySelector('#fourth-change').onclick = function () {
    domObject.fourthChange = true
}

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    

    // Update sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

    // Controls
    controls.update()

    // DOM INTERACTIONS
    // part 1
    if (domObject.part === 1) {
        camera.position.set(1.1, -2.3, 1.3)
        camera.lookAt(-5, 0, 1.5)
    }

    // part 2
    if (domObject.part === 2) {

        domObject.firstChange = false
        domObject.secondChange = false
        camera.position.set(9.9, 3.5, 10.5)
        camera.lookAt(0, 0, 0)
        sphere1.position.set(6, 3, 0)
        sphere2.position.set(6, 2.9, 2)
        sphere3.position.set(6, 2.7, -2)

        sphere1.scale.z = 5
        sphere2.scale.z = 5
        sphere3.scale.z = 5

        sphere1.castShadow = true
        sphere2.castShadow = true
        sphere3.castShadow = true
    }

    // first-change
    if (domObject.firstChange) {

        sphere1.castShadow = true
        sphere2.castShadow = true
        sphere3.castShadow = true

       
        sphere1.position.z = Math.sin(elapsedTime * 0.5) * 6
        sphere2.position.z = Math.sin(elapsedTime * 0.5) * 6.5
        sphere3.position.z = Math.sin(elapsedTime * 0.5) * 6.8
    }
    // second-change
    if (domObject.secondChange) {
        sphere1.position.set(0, 3, 0)
        sphere2.position.set(0, 2.9, 2)
        sphere3.position.set(0, 2.7, -2)

        sphere1.position.z = Math.sin(elapsedTime * 0.5) * 3
        sphere2.position.z = Math.sin(elapsedTime * 0.5) * 4
        sphere3.position.z = Math.sin(elapsedTime * 0.5) * 5

        if (!domObject.secondChangeApplied) {
            
            const scaleFactor = (elapsedTime * 0.5) * 6
            sphere1.scale.set(1, 1, scaleFactor);
            sphere2.scale.set(1, 1, scaleFactor);
            sphere3.scale.set(1, 1, scaleFactor);
    
            
            domObject.secondChangeApplied = true
        
        }
    }

    // third-change
    if (domObject.thirdChange) {
        
        capsule1.visible = true
        capsule2.visible = true
        capsule3.visible = true
        capsule4.visible = true

        capsule1.castShadow = true
        capsule2.castShadow = true
        capsule3.castShadow = true
        capsule4.castShadow = true

        capsule1.position.y -= 0.1 
        capsule2.position.y -= 0.1
        capsule3.position.y -= 0.1
        capsule4.position.y -= 0.1

        
        if (capsule1.position.y <= 0) {
            capsule1.position.y = 2.6 
        }
        if (capsule2.position.y <= 0) {
            capsule2.position.y = 2.6
        }
        if (capsule3.position.y <= 0) {
            capsule3.position.y = 2.6
        }
        if (capsule4.position.y <= 0) {
            capsule4.position.y = 2.6
        }
       
    }

    // fourth-change
    if (domObject.fourthChange) {
        directionalLight.position.y -= 0.05
        directionalLight.position.x -= -0.05
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()