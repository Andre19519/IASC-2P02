import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth / 2.5,
    height: window.innerWidth / 2.5,
    aspectRatio: 1
}

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
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, 20)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS **
************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/
// Torusknot Geometry
const geometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16)

// torusknot Materials
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C61C1C')
})
const yellowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FAC116')
})
const orangeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FD7A00')
})

const drawTorusknot = (i, material) =>
{
    const torusknot = new THREE.Mesh(geometry, material)
    torusknot.position.x = (Math.random() - 0.5) * 10
    torusknot.position.z = (Math.random() - 0.5) * 10
    torusknot.position.y = i - 10

    torusknot.rotation.x = Math.random() * 2 * Math.PI
    torusknot.rotation.y = Math.random() * 2 * Math.PI
    torusknot.rotation.z = Math.random() * 2 * Math.PI
    

    scene.add(torusknot)
}


/**********************
** TEXT PARSERS & UI **
***********************/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'book',
    term2: 'television',
    term3: 'seashell',
    rotateCamera: false
}

// Text Parsers
// Parse Text and Terms
const parseTextandTerms = () =>
{
    // Strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()
    //console.log(parsedText)

    // Tokenize text
    uiobj.textArray = parsedText.split(/[^\w']+/)
    //console.log(uiobj.textArray)

    // Find term 1
    findTermInParsedText(uiobj.term1, redMaterial)

    // Find term 2
    findTermInParsedText(uiobj.term2, yellowMaterial)

    // Find term 3
    findTermInParsedText(uiobj.term3, orangeMaterial)

}

const findTermInParsedText = (term, material) =>
{
    for (let i=0; i < uiobj.textArray.length; i++)
    {
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term)
        {
         //console.log(i, term)
         // convert i into n, which is a value between 0 and 20
         const n = (100 / uiobj.textArray.length) * i * 0.2
         
         // call drawtorusknot function 5 times using converted n value
         for(let a=0; a < 5; a++)
         {
            drawTorusknot(n, material)
         }

        }
    }
}

// Load source text
fetch("https://raw.githubusercontent.com/timguoqk/cloze/master/books/Fahrenheit%20451%20-%20Ray%20Bradbury.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerms()
    }
    )

// UI
const ui = new dat.GUI({
    container: document.querySelector('#parent1')
})

// Interaction Folders
    // Torusknots Folder
    const torusFolder = ui.addFolder('Filter Terms')

    torusFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term1}`)

    torusFolder
        .add(yellowMaterial, 'visible')
        .name(`${uiobj.term2}`)

    torusFolder
        .add(orangeMaterial, 'visible')
        .name(`${uiobj.term3}`)
        

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()

    // Camera Rotation
    if(uiobj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.2) * 16
        camera.position.z = Math.cos(elapsedTime * 0.2) * 16
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()