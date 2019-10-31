window.addEventListener("keydown", function(e) {
    if (e.key == "z") {
        if (player.inCar != undefined && !player.inCar.accelerating) {
            player.driving[0] = true;
            player.inCar.accelerating = true;
            if (player.inCar.speed < 0.3)
                player.inCar.speed = 0.3;
        } else 
            player.moving[0] = true;
    }
    else if (e.key == "s")
        if (player.inCar != undefined && !player.inCar.accelerating) {
            player.driving[1] = true;
            player.inCar.accelerating = true;
            if (player.inCar.speed < 0.3)
                player.inCar.speed = 0.3;
        } else
            player.moving[1] = true;
    else if (e.key == "q")
        if (player.inCar != undefined)
            player.driving[2] = true;
        else
            player.moving[2] = true;
    else if (e.key == "d")
        if (player.inCar != undefined)
            player.driving[3] = true;
        else
            player.moving[3] = true;
    else if (e.keyCode == 37)
        player.turning[0] = true;
    else if (e.keyCode == 39)
        player.turning[1] = true;
    else if (e.keyCode == 32 && !player.jumping[0]) {
        player.jumping = [true, true];
        player.jumpingSpeed = 0.15;
    } else if (e.keyCode == 13) {
        player.shooting[0] = true;
        player.shooting[1] = Date.now();
    } else if (e.key == "v")
        player.camera.position.y = -2;
    else if (e.key == "x")
        player.camera.position.y = -4;
    else if (e.key == "e") {
        if (player.inCar != undefined) {
            player.leaveCar();
        } else {
            cars.forEach(car => {
                if (collideBetween(player.camera.position, car.object.position)) {
                    player.enterCar(car);
                }
            });
        }
    }
});

window.addEventListener("keyup", function(e) {
    if (e.key == "z") {
        if (player.inCar != undefined)
            player.inCar.accelerating = false;
        else
            player.moving[0] = false;
    } else if (e.key == "s") {
        if (player.inCar != undefined)
            player.inCar.accelerating = false;
        else
            player.moving[1] = false;
    } else if (e.key == "q")
        if (player.inCar != undefined)
            player.driving[2] = false;
        else
            player.moving[2] = false;
    else if (e.key == "d")
        if (player.inCar != undefined)
            player.driving[3] = false;
        else
            player.moving[3] = false;
    else if (e.keyCode == 37)
        player.turning[0] = false;
    else if (e.keyCode == 39)
        player.turning[1] = false;
    else if (e.keyCode == 13)
        player.shooting[0] = false;
    else if (e.key == "v")
        player.camera.position.y = 1;
    else if (e.key == "x")
        player.camera.position.y = 1;
});