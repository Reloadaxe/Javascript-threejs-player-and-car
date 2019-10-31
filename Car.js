function Car(object) {
    this.object = object;
    this.speed = 0.3;
    this.accelerating = false;
}

function createCar() {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load( 'Scion/Scion.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'Scion/Scion.obj', function ( mesh ) {
            mesh.traverse(function(child){child.castShadow = true;});
            mesh.position.y -= 5;
            mesh.scale.x *= 1.2;
            mesh.scale.y *= 1.2;
            mesh.scale.z *= 1.2;
            cars.push(new Car(mesh));
            scene.add(mesh);
        });
    });
}