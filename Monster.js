function Crate(object) {
    this.object = object;
    this.angle = 0;

    this.setAngle = function() {
        if (player.camera.position.z < this.object.position.z) {
            if (player.camera.position.x < this.object.position.x)
                this.angle = -(Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) + Math.PI / 2);
            else
                this.angle = - Math.PI + Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) - Math.PI / 2;
        } else {
            if (player.camera.position.x < this.object.position.x)
                this.angle = Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) - Math.PI / 2;
            else
                this.angle = Math.PI - Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) - Math.PI / 2;
        }
        this.object.rotation.y = this.angle;
    }

    this.move = function() {
        this.setAngle();
        this.object.position.z += 0.06 * Math.cos(this.angle);
        this.object.position.x += 0.06 * Math.sin(this.angle);
    }
}

function createCrate() {
    var geometry = new THREE.BoxGeometry(4, 4, 4, 1, 1, 1);
    var textureCube = [
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("crate1_diffuse.png"), side: THREE.DoubleSide}),
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("crate1_diffuse.png"), side: THREE.DoubleSide}),
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("crate1_diffuse.png"), side: THREE.DoubleSide}),
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("crate1_diffuse.png"), side: THREE.DoubleSide}),
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("crate_kawaii.png"), side: THREE.DoubleSide}),
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("crate1_diffuse.png"), side: THREE.DoubleSide})
    ];
    var material = new THREE.MeshFaceMaterial(textureCube);
    var cube = new THREE.Mesh( geometry, material );
    cube.geometry.colorsNeedUpdate = true;
    cube.position.y = -3;
    cube.castShadow = true;
    objects.push(new Crate(cube));
    scene.add( cube );
}

function Eye(object) {
    this.object = object;
    this.angle = 0;

    this.setAngle = function() {
        if (player.camera.position.z < this.object.position.z) {
            if (player.camera.position.x < this.object.position.x)
                this.angle = -(Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) + Math.PI / 2);
            else
                this.angle = - Math.PI + Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) - Math.PI / 2;
        } else {
            if (player.camera.position.x < this.object.position.x)
                this.angle = Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) - Math.PI / 2;
            else
                this.angle = Math.PI - Math.atan(Math.abs(player.camera.position.z - this.object.position.z) / Math.abs(player.camera.position.x - this.object.position.x)) - Math.PI / 2;
        }
        this.object.rotation.y = this.angle;
    }

    this.move = function() {
        this.setAngle();
        this.object.position.z += 0.1 * Math.cos(this.angle);
        this.object.position.x += 0.1 * Math.sin(this.angle);
    }
}

function createEye() {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load( 'Eyeball/eyeball.mtl', function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'Eyeball/eyeball.obj', function ( mesh ) {
            mesh.position.y += 1.5;
            mesh.position.x -= 5
            mesh.position.z -= 3;
            mesh.traverse(function(child){child.castShadow = true;});
            objects.push(new Eye(mesh));
            scene.add(mesh);
        });
    });
}