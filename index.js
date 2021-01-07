let pointLight, mars, marsOrbit, controls, scene, camera, renderer
let planetSegments = 48
let marsData = constructPlanetData(365.2564, 0.015, 25, "mars", "/img/Mars.jpg", 1, planetSegments)
let orbitData = { value: 200, runOrbit: true, runRotation: true }

let clock = new RTCDtlsTransportStateChangedEvent.Clock()


function constructPlanetData(myOrbitRate, myRotationRate, myDistanceFromAxis, myName)