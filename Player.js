function PlaySound(audio){
    var listener = new THREE.AudioListener();
    player.camera.add( listener );
    var sound = new THREE.Audio( listener );
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( audio, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume(1);
        sound.play();
    });
}

function Player() {
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.moving = [false, false, false, false];
    this.turning = [false, false, false, false];
    this.driving = [false, false, false, false];
    this.jumping = [false, false];
    this.jumpingSpeed = 0;
    this.balls = [];
    this.shooting = [false, Date.now()];
    this.camera.position.z = 5;
    this.inCar;

    this.jump = function() {
        if (this.jumping[1]) {
            if (this.jumpingSpeed < 0.01) {
                this.jumping[1] = false;
            } else {
                this.camera.position.y += this.jumpingSpeed;
                this.jumpingSpeed *= 0.9;
            }
        } else {
            if (this.camera.position.y < 0.01) {
                this.camera.position.y = 0;
                this.jumping[0] = false;
            } else {
                this.camera.position.y -= this.jumpingSpeed;
                this.jumpingSpeed *= 1.1;
            }
        }
    }

    this.createBall = function() {
        if (this.shooting[1] + 100 < Date.now()) {
            var geometry = new THREE.SphereGeometry(0.05, 32, 32);
            var material = new THREE.MeshPhongMaterial({color: 0x000000});
            var sphere = new THREE.Mesh(geometry, material);
            sphere.position.x = this.camera.position.x;
            sphere.position.y = this.camera.position.y;
            sphere.position.z = this.camera.position.z;
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            //this.balls.push([sphere, this.camera.rotation.y, Date.now()]);
            this.balls.push(new Ball(sphere, this.camera.rotation.y));
            scene.add(sphere);
            document.getElementById("weapon").setAttribute("src", "m16Shoot.png");
            this.shooting[1] = Date.now();
            PlaySound("pewpew.ogg");
        }
    }

    this.shoot = function() {
        if (this.shooting[1] + 200 < Date.now())
            document.getElementById("weapon").setAttribute("src", "m16.png");
        this.balls.forEach(ball => {
            ball.move();
        });
    }

    this.move = function() {
        if (this.inCar == undefined) {
            if (this.moving[0]) {
                this.camera.position.z -= 0.2 * Math.cos(this.camera.rotation.y);
                this.camera.position.x -= 0.2 * Math.sin(this.camera.rotation.y);
            } 
            if (this.moving[1]) {
                this.camera.position.z += 0.2 * Math.cos(this.camera.rotation.y);
                this.camera.position.x += 0.2 * Math.sin(this.camera.rotation.y);
            }
            if (this.moving[2]) {
                this.camera.position.x -= 0.2 * Math.cos(this.camera.rotation.y);
                this.camera.position.z += 0.2 * Math.sin(this.camera.rotation.y);
            }
            if (this.moving[3]) {
                this.camera.position.x += 0.2 * Math.cos(this.camera.rotation.y);
                this.camera.position.z -= 0.2 * Math.sin(this.camera.rotation.y);
            }
            if (this.jumping[0])
                this.jump();
            if (this.turning[0])
                this.camera.rotation.y += 0.05;
            if (this.turning[1])
                this.camera.rotation.y -= 0.05;
            if (this.shooting[0])
                this.createBall();
        } else {
            if (this.inCar.accelerating && this.inCar.speed <= 1) {
                this.inCar.speed *= 1.01;
            } else if (this.driving[0] || this.driving[1]) {
                this.inCar.speed /= 1.01;
            }
            if (this.inCar.speed < 0.1) {
                this.driving[0] = false;
                this.driving[1] = false;
            }
            if (this.driving[0]) {
                if (this.driving[2]) {
                    this.inCar.object.rotation.y += 0.03;
                }
                if (this.driving[3]) {
                    this.inCar.object.rotation.y -= 0.03;
                }
                this.inCar.object.position.z -= this.inCar.speed * Math.cos(this.camera.rotation.y);
                this.inCar.object.position.x -= this.inCar.speed * Math.sin(this.camera.rotation.y);
            } 
            if (this.driving[1]) {
                if (this.driving[2]) {
                    this.inCar.object.rotation.y -= 0.03;
                }
                if (this.driving[3]) {
                    this.inCar.object.rotation.y += 0.03;
                }
                this.inCar.object.position.z += this.inCar.speed * Math.cos(this.camera.rotation.y);
                this.inCar.object.position.x += this.inCar.speed * Math.sin(this.camera.rotation.y);
            }
            var car = this.inCar.object;
            this.camera.rotation.x = car.rotation.x;
            this.camera.rotation.y = car.rotation.y + Math.PI;
            this.camera.rotation.z = car.rotation.z;
            this.camera.position.x = car.position.x - Math.cos(this.camera.rotation.y) * Math.sqrt(0.2 * 0.2 + 2 * 2);
            this.camera.position.z = car.position.z - Math.sin(this.camera.rotation.y - Math.PI) * Math.sqrt(0.2 * 0.2 + 2 * 2);
            this.camera.position.y = car.position.y + 4.5;
        }
    }

    this.enterCar = function(car) {
        var huds = document.getElementsByClassName("hud");
        for (let i = 0; i < 2; i++)
            huds[i].setAttribute("hidden", true);
        this.inCar = car;
    }

    this.leaveCar = function() {
        var huds = document.getElementsByClassName("hud");
        for (let i = 0; i < 2; i++) {
            huds[i].removeAttribute("hidden");
        }
        this.inCar = undefined;
    }
}