import * as THREE from "three"


/***********
 ** SCENE **
 ***********/
 // Canvas
const canvas = document.querySelector('.webgl')
 
// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray') 

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)
 
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})

renderer.setSize(window.innerWidth, window.innerHeight)

/***********
 ** MESHES **
 ***********/

 // testShapes

 const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material = new THREE.MeshNormalMaterial(); 
const testTorus = new THREE.Mesh( geometry, material ); 

const cubeGeometry = new THREE.BoxGeometry(1)
const cubeMaterial = new THREE.MeshNormalMaterial()
const testCube = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(testTorus);
scene.add(testCube)

 /**********************
  ** ANIMATION LOOP **
  **********************/
const clock = new THREE.Clock()

  // Animate
  const animation = () =>
  {
        //Return Elasped time
        const ElaspedTime = clock.getElapsedTime()
        

        //Animate testTorus
        testTorus.position.y = Math.sin(ElaspedTime) 
        testTorus.position.x = Math.sin(ElaspedTime)
        

        testTorus.scale.x = Math.sin(ElaspedTime * 0.3) * 0.5
        testTorus.scale.y = Math.sin(ElaspedTime* 0.3) * 0.5
        testTorus.scale.z = Math.sin(ElaspedTime * 0.3) * 0.5


        //Animate testsphere
        testCube.position.y = Math.sin(ElaspedTime)
        testCube.position.x = Math.sin(ElaspedTime)
        testCube.position.z = Math.sin(ElaspedTime)

        testCube.scale.x = Math.sin(ElaspedTime)
        testCube.scale.y = Math.sin(ElaspedTime)
        testCube.scale.z = Math.sin(ElaspedTime)

        testCube.rotation.x = Math.sin(ElaspedTime * 2)
        testCube.rotation.y = Math.sin(ElaspedTime * 2)

        //Renderer
        renderer.render(scene, camera)

        //Request Next Frame
        window.requestAnimationFrame(animation)
  }

  animation()
 