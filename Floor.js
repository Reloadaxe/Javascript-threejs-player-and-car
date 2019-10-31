function addFloor() {
    var x = 1000;
    var z = 1000;
    var geometry = new THREE.PlaneGeometry( 1000, 1000 );
    var loader = new THREE.TextureLoader();
    var texture = loader.load("grass.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( x / 10, z / 10);
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00, map: texture} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = -(Math.PI / 2);
    plane.position.y = -5;
    plane.receiveShadow = true;
    scene.add( plane );
}