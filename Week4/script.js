import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/*********
** Setup**
*********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / innerHeight

}


/*********
 **Scene**
 *********/

 //Canvas
const canvas = document.querySelector('.webgl')
 //Scene
 const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')
 //Camera
const camera = new  THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(2, 2, 4)
scene.add(camera)

 //Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
/*********
**Meshes**
*********/

// Clipping Plane
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('blue'), 
side: THREE.DoubleSide,
wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)


plane.rotation.x = Math.PI * 0.5
scene.add(plane)


// sphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial({clippingPlanes: [ clippingPlane ]})
const testSphere = new THREE.Mesh(geometry, material)



scene.add(testSphere)

/*********
 ***UI****
 ********/
const ui = new dat.GUI()

//UI object
const uiObject = {}
uiObject.play = false



//Reset Sphere position
uiObject.resetSpherePosition = () => {
    testSphere.position.set(0, 0, 0)
  }


//plane UI
const planeFolder = ui.addFolder('plane')

planeFolder
    .add(planeMaterial, 'wireframe')

//Sphere UI
const sphereFolder = ui.addFolder('sphere')

sphereFolder
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Height')
    .listen()

sphereFolder
    .add(testSphere.position, 'x')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Length')
    .listen()

sphereFolder
    .add(uiObject, 'play')
    .name('animate sphere')
    
sphereFolder
    .add(renderer, 'localClippingEnabled')
    .name('clip')


sphereFolder
    .add(uiObject, 'resetSpherePosition')
    .name('Reset Sphere Position')


/********************
 ** ANIMATION LOOP **
 *******************/
const clock = new THREE.Clock()

 //Animate
const animation = () =>
{
    //Return ElaspedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate Sphere
    if (uiObject.play && testSphere.position.x === 0) 
    
    {
        testSphere.position.y = Math.sin(elapsedTime * 0.5) * 2
    }

    if (uiObject.play && testSphere.position.y === 0) 
    
    {
        testSphere.position.x = Math.sin(elapsedTime * 0.5) * 2
    }

    if (uiObject.play && ((testSphere.position.x < 0 || testSphere.position.x > 0) && (testSphere.position.y < 0 || testSphere.position.y > 0)))
    {
        testSphere.position.y = Math.sin(elapsedTime * 0.5) * 2
        testSphere.position.x = Math.sin(elapsedTime * 0.5) * 2
    }


    //controls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()
