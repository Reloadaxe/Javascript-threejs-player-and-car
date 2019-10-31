var scene = new THREE.Scene();
var player, cube, objects, cars;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 4);
renderer.setClearColor("whitesmoke");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild( renderer.domElement );

function collideBetween(obj, obj2) {
    if (Math.abs(obj.x - obj2.x) < 10 && Math.abs(obj.y - obj2.y) < 10)
        return (true);
    else
        return (false);
}

function setup() {
    player = new Player();
    objects = [];
    cars = [];
    createWallAroundMap(50, 50, 10, "black");
    createLight();
    createCrate();
    createEye();
    createCar();
    addFloor();
    animate();
}

function animate() {
    requestAnimationFrame( animate );
    objects.forEach(object => {
        if (object.move != undefined)
            object.move();
        player.balls.forEach(ball => {
            ball.collide(object);
        });
    });
    player.move();
    player.shoot();
	renderer.render( scene, player.camera );
}

setup();