(function (window) {
    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;
        var item;
        var topObs = groundY-100;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'stickman', x:600, y:groundY},
                {type: 'eraser', x:1200, y:groundY},
                {type: 'eraser', x:1700, y:topObs},
                {type: 'stickman', x:2550, y:groundY},
                {type: 'eraser', x:2300, y:groundY},
                {type: 'eraser', x:2800, y:groundY},
                {type: 'stickman', x:3000, y:groundY},
                {type: 'eraser', x:4000, y:topObs},
                {type: 'stickman', x:3500, y:groundY},
                {type: 'eraser', x:5000, y:groundY},
                {type: 'eraser', x:5500, y:topObs},
                {type: 'stickman', x:5000, y:groundY},
                {type: 'eraser', x:6000, y:groundY},
                {type: 'eraser', x:6500, y:groundY},
                {type: 'stickman', x:6500, y:groundY},
                {type: 'eraser', x:6800, y:topObs},
                {type: 'stickman', x:7500, y:groundY},
                {type: 'eraser', x:7200, y:groundY},
                {type: 'eraser', x:8200, y:topObs},
                {type: 'stickman', x:8000, y:groundY},
                {type: 'eraser', x:8750, y:groundY},
                {type: 'eraser', x:9500, y:groundY},
                {type: 'doodlebob', x:9000, y:groundY},
                {type: 'reward', x:9500, y:groundY}
            ]
        };
        
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 5;
        
        var createEraser = function(x, y) {
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y -10;
            var obstacleImage = draw.bitmap("img/obstacle.png");
            obstacleImage.x  = -25;
            obstacleImage.y = -20;
            myObstacle.velocityX = -7;
            myObstacle.addChild(obstacleImage);
            game.addGameItem(myObstacle);
        };
        var createStickMan = function(x, y) {
            var enemy = game.createGameItem('enemy',110);
            var obstacleImage = draw.bitmap("img/stickmanonahorse.png");
            obstacleImage.x = -150;
            obstacleImage.y = -100;
            enemy.addChild(obstacleImage);
            enemy.x = x;
            enemy.y = y - 90;
            enemy.velocityX = -5;
            game.addGameItem(enemy);
            
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(100);
                enemy.fadeOut();
            }
        };
        
        var createDoodleBob = function(x, y) {
            var enemy = game.createGameItem('boss', 250);
            var obstacleImage = draw.bitmap("img/doddlebob.png")
            obstacleImage.x = -200;
            obstacleImage.y = -200;
            enemy.addChild(obstacleImage);
            enemy.x = x;
            enemy.y = y - 200;
            enemy.velocityX = -5;
            game.addGameItem(enemy);
            
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-100);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function() {
                game.increaseScore(1000)
                enemy.fadeOut(5)
            }
        }
        
        var createReward = function(x, y) {
            var reward = game.createGameItem('reward', 25);
            var yellowCircle = draw.circle(25, "#ffff00", "black", 2);
            reward.x = x;
            reward.y = y - 100;
            reward.addChild(yellowCircle);
            game.addGameItem(reward);
            reward.velocityX = -5;
            
            reward.onPlayerCollision = function() {
                game.increaseScore(5000);
                reward.fadeOut();
            }
        }
        
        levelData.gameItems.forEach(function(item) {
            if (item.type === "eraser") {
                createEraser(item.x, item.y);
            } else if (item.type === "stickman") {
                createStickMan(item.x, item.y);
            } else if (item.type === "doodlebob") {
                createDoodleBob(item.x, item.y)
            } else if (item.type === "reward") {
                createReward(item.x, item.y);
            }
            console.log(item.type);
            
        });
    };
})(window);
