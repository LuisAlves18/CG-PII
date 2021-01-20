let img;
let tank = {

    base: null,
    wheel1: null,
    wheel2: null,
    wheel3: null,
    wheel4: null,
    anthena: null,
    anthenaTop: null,
    cockpit: null,
    light1: null,
    light2: null,
    baseLength: 200,
    baseWidth: 170,
    baseHeight: 100,
    forward: false,
    right: false
}

let rotacao = 0
let plane
let count = 0
let removeNumber = 10
let meteors = []
let buttonEnter = document.getElementById("buttonEnter")
let flagButton = false

let curiosities = [
    "O nome de Marte é inspirado no deus da guerra",
    "Tem aproximadamente a mesma massa terrestre que o planeta Terra",
    "O planeta tem o maior vulcão de todo o Sistema Solar",
    "Marte tem as maiores tempestades de poeira também",
    "Em Marte, o Sol parece ter a metade do tamanho que aparenta se for visto da Terra",
    "Pedaços de Marte já caíram na Terra",
    "Há sinais de água líquida em Marte",
    "Existem planos para enviar missões tripuladas a Marte a partir de 2022",
    "Apenas 19 missões a Marte foram bem-sucedidas",
    "Um dia, Marte terá um anel"
]

window.onload = function() {
    let meteorTexture = new THREE.TextureLoader().load('textures/4k_ceres_fictional.jpg')
    let sphere = new THREE.Mesh(
        new THREE.DodecahedronGeometry(60, 0),
        new THREE.MeshLambertMaterial({
            map: meteorTexture,
            side: THREE.DoubleSide

        })

    )
    sphere.position.y = 70
    sphere.position.x = Math.ceil(Math.random() * 2000) * (Math.round(Math.random()) ? 1 : -1)
    sphere.position.z = Math.ceil(Math.random() * 2000) * (Math.round(Math.random()) ? 1 : -1)

    scene.add(sphere);
    meteors.push(sphere)

    camera.position.y = 5000;
    camera.position.x = 11000

    camera.lookAt(tank.base.position);

    buttonEnter.addEventListener("click", enterMars)
}

function getRandomNumber() {
    return Math.floor(Math.random() * removeNumber)
}

document.getElementById("teste").innerHTML = count + " /10"
radians = function(degrees) {
    return degrees * Math.PI / 180;
};

degrees = function(radians) {
    return radians * 180 / Math.PI;
};

let height_scale = 80;

function addLights() {
    let ambientLight = new THREE.AmbientLight(0x444444);
    ambientLight.intensity = 0.0;
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff);

    directionalLight.position.set(900, 400, 0000).normalize();
    scene.add(directionalLight);
}

function getTerrainPixelData() {
    img = document.getElementById("landscape-image");
    let canvas = document.getElementById("canvas");

    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    let data = canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data;
    let normPixels = []

    for (let i = 0, n = data.length; i < n; i += 4) {

        normPixels.push((data[i] + data[i + 1] + data[i + 2]) / 3);
    }

    return normPixels;
}

function addGround() {
    terrain = getTerrainPixelData();

    let geometry = new THREE.PlaneGeometry(10000 * img.width / img.height, 10000, img.width - 1, img.height - 1);
    let material = new THREE.MeshLambertMaterial({
        color: 0x9E5000,
        wireframe: false
    });
    console.log(img.height)


    for (let i = 0, l = geometry.vertices.length; i < l; i++) {
        let terrainValue = terrain[i] / 255;
        geometry.vertices[i].z = geometry.vertices[i].z + terrainValue * height_scale;
    }


    terrain = null;

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    plane = new THREE.Mesh(geometry, material);

    plane.position = new THREE.Vector3(2000, 0, 2000);


    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), 90 * Math.PI / 180);
    plane.quaternion.multiplyQuaternions(q, plane.quaternion);

    scene.add(plane)
}

function addBackground() {
    let floorTexture = new THREE.TextureLoader().load('textures/galaxy_starfield.png');

    let starField = new THREE.Mesh(
        new THREE.SphereGeometry(7000, 64, 64),
        new THREE.MeshLambertMaterial({
            map: floorTexture,
            side: THREE.DoubleSide,
        })
    )
    scene.add(starField)
}

function createMars() {
    let mapTexture = new THREE.TextureLoader().load('textures/marsmap1k.jpg')

    let mars = new THREE.Mesh(
        new THREE.SphereGeometry(7200, 64, 64),
        new THREE.MeshLambertMaterial({
            map: mapTexture,
            side: THREE.DoubleSide
        })

    )
    scene.add(mars)


}



function createTank() {


    // Base
    geometry = new THREE.BoxGeometry(tank.baseWidth, tank.baseHeight, tank.baseLength);
    material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    tank.base = new THREE.Mesh(geometry, material);
    tank.base.rotation.y = Math.PI;
    tank.base.position.y = plane.position.y + 100;
    tank.base.position.z = 30;
    scene.add(tank.base)


    //Wheel1 Left
    tank.wheel1 = new THREE.Mesh(
        new THREE.CircleGeometry(45, 72),
        new THREE.MeshBasicMaterial({ color: 5921370 })
    )
    tank.wheel1.rotation.y = Math.PI / 2
    tank.wheel1.position.x = 90
    tank.wheel1.position.z = -50
    tank.wheel1.position.y = -40
    tank.base.add(tank.wheel1)

    //Wheel2 Left
    tank.wheel2 = new THREE.Mesh(
        new THREE.CircleGeometry(45, 72),
        new THREE.MeshBasicMaterial({ color: 5921370 })
    )
    tank.wheel2.rotation.y = Math.PI / 2
    tank.wheel2.position.x = 90
    tank.wheel2.position.z = 50
    tank.wheel2.position.y = -40
    tank.base.add(tank.wheel2)


    //Wheel3 Left
    tank.wheel3 = new THREE.Mesh(
        new THREE.CircleGeometry(45, 72),
        new THREE.MeshBasicMaterial({ color: 5921370 })
    )
    tank.wheel3.rotation.y = 3 * Math.PI / 2
    tank.wheel3.position.x = -90
    tank.wheel3.position.z = 50
    tank.wheel3.position.y = -40
    tank.base.add(tank.wheel3)


    //Wheel4 Left
    tank.wheel4 = new THREE.Mesh(
        new THREE.CircleGeometry(45, 72),
        new THREE.MeshBasicMaterial({ color: 5921370 })
    )
    tank.wheel4.rotation.y = 3 * Math.PI / 2
    tank.wheel4.position.x = -90
    tank.wheel4.position.z = -50
    tank.wheel4.position.y = -40
    tank.base.add(tank.wheel4)

    //Anthena
    tank.anthena = new THREE.Mesh(
        new THREE.BoxGeometry(10, 90, 10),
        new THREE.MeshBasicMaterial({ color: 8421504 })

    )
    tank.anthena.position.y = 90
    tank.anthena.position.x = 60
    tank.anthena.position.z = -65
    tank.base.add(tank.anthena)


    //AnthenaTop
    tank.anthenaTop = new THREE.Mesh(
        new THREE.CylinderGeometry(51.1, 24.1, 21, 22),
        new THREE.MeshBasicMaterial({ color: 8421504 })
    )
    tank.anthenaTop.position.y = 140
    tank.anthenaTop.position.x = 60
    tank.anthenaTop.position.z = -60
    tank.anthenaTop.rotation.x = (Math.PI / 2) - (Math.PI / 4)


    tank.base.add(tank.anthenaTop)

    //light1
    tank.light1 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })

    )
    tank.light1.position.y = -10
    tank.light1.position.x = 40
    tank.light1.position.z = 100
    tank.base.add(tank.light1)

    //light2
    tank.light2 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })

    )
    tank.light2.position.y = -10
    tank.light2.position.x = -40
    tank.light2.position.z = 100
    tank.base.add(tank.light2)


    //cockpit
    tank.cockpit = new THREE.Mesh(
        new THREE.BoxGeometry(100, 60, 90),
        new THREE.MeshBasicMaterial({ color: 11393254 })

    )
    tank.cockpit.position.y = 80
    tank.cockpit.position.x = 0
    tank.cockpit.position.z = 40
    tank.base.add(tank.cockpit)
}






function checkCollisions() {
    let vertices = []

    tank.base.updateMatrixWorld();
    tank.base.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            let len = child.geometry.vertices.length
            for (let i = 0; i < len; i++) {
                let v = child.geometry.vertices[i].clone()

                v.applyMatrix4(child.matrixWorld)

                vertices.push(v)
            }
        }
    })

    for (let i = 0; i < meteors.length; i++) {
        let wallBox = new THREE.Box3().setFromObject(meteors[i])
        for (let j = 0; j < vertices.length; j++) {
            let collision = wallBox.containsPoint(vertices[j])
            if (collision) {
                console.log("Hit");
                count++

                let sortNumber = getRandomNumber()

                document.getElementById("info").innerHTML = curiosities[sortNumber]
                curiosities.splice(sortNumber, 1)
                removeNumber--

                console.log(count)

                document.getElementById("teste").innerHTML = count + " /10"
                scene.remove(meteors[i])
                meteors.splice(i, 1)



                if (count < 10) {
                    let meteorTexture = new THREE.TextureLoader().load('textures/4k_ceres_fictional.jpg')
                    let sphere = new THREE.Mesh(
                            new THREE.DodecahedronGeometry(60, 0),
                            new THREE.MeshLambertMaterial({
                                map: meteorTexture,
                                side: THREE.DoubleSide

                            })
                        )
                        // const geometry = new THREE.SphereGeometry(30, 32, 32);
                        // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                        // const sphere = new THREE.Mesh(geometry, material);
                    sphere.position.y = 70
                    sphere.position.x = Math.ceil(Math.random() * 3000) * (Math.round(Math.random()) ? 1 : -1)
                    sphere.position.z = Math.ceil(Math.random() * 3000) * (Math.round(Math.random()) ? 1 : -1)


                    scene.add(sphere);
                    meteors.push(sphere)
                    break
                }




                return true
            }

        }

    }
    return false

}


function render() {
    let oldPos = tank.base.position.clone()

    /*** MOVE TANK BASE ***/
    if (tank.right == 1) {
        tank.base.rotation.y -= 0.03
    } else if (tank.right == -1) {
        tank.base.rotation.y += 0.03
    }

    if (tank.forward == 1) {
        tank.base.position.x += 10 * Math.sin(tank.base.rotation.y)
        tank.base.position.z += 10 * Math.cos(tank.base.rotation.y)



        if (checkCollisions()) {
            tank.base.position.x = oldPos.x
            tank.base.position.z = oldPos.z
        }

    } else if (tank.forward == -1) {
        tank.base.position.x -= 10 * Math.sin(tank.base.rotation.y)
        tank.base.position.z -= 10 * Math.cos(tank.base.rotation.y)
    }


    for (let i = 0; i < 360; i++) {
        rotacao = rotacao + 0.0001
        tank.anthenaTop.rotation.z = rotacao
    }



    if (flagButton) {
        let relativeOffset = new THREE.Vector3(0, 300, -500);
        // updates the offset with the object’s global transformation matrix
        let cameraOffset = relativeOffset.applyMatrix4(tank.base.matrixWorld);
        // updates the camera position with the new offset
        camera.position.copy(cameraOffset);
        // camera looks at the object’s position
        camera.lookAt(tank.base.position);





        camera.lookAt(tank.base.position);
    }



    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function enterMars() {
    buttonEnter.style.visibility = "hidden"

    flagButton = true

}


document.addEventListener('keydown', (e) => {

    let key = e.key;

    /*** MOVE TANK BASE ***/
    if (key == "w") {
        tank.forward = 1;
    }
    if (key == "s") {
        tank.forward = -1;
    }
    if (key == "d") {
        tank.right = 1;
    }
    if (key == "a") {
        tank.right = -1;
    }
});

document.addEventListener('keyup', (e) => {

    //console.log("keyup")
    let key = e.key;

    if (key == "w" || key == "s") {
        tank.forward = 0;
    }

    if (key == "d" || key == "a") {
        tank.right = 0;
    }

});


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
let renderer = new THREE.WebGLRenderer();



addLights();
addGround();
addBackground();
createTank();

checkCollisions();
createMars();




renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

render();