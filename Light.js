function createLight() {
    var ambiant = new THREE.AmbientLight(0x666666, 0.2);
    
    var light = new THREE.PointLight(0xffffff, 1, 300);
    light.position.set(20, 20, 10);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500;
    
    scene.add(ambiant);
    scene.add(light);
}