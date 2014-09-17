enchant();

window.onload = function() {
  var core = new Core(320, 320);
  core.preload(['chara7.png', 'chara2.png', 'icon0.png', 'monster4.gif', 'effect0.png', 'clear.png', 'map2.png', 'bigmonster1.gif', 'bgm.wav', 'bomb.mp3', 'bigbomb.mp3', 'gameover.png', 'monster3.gif', 'gameclear.wav', 'gameover.wav']);
  core.fps = 10;
  core.onload = function() {
  var bgm = core.assets['bgm.wav'].clone();
  var soundBomb = core.assets['bomb.mp3'];
  var soundBigBomb = core.assets['bigbomb.mp3'];
  var soundGameOver = core.assets['gameover.wav']
  var soundGameClear = core.assets['gameclear.wav']
  bgm.play();
  gameOverScene = new Scene();
  gameOverScene.backgroundColor = 'black';
  var gameover = new Sprite(189, 97);
  gameover.image = core.assets['gameover.png'];
  gameover.x = 60;
  gameover.y = 100;
  gameOverScene.addChild(gameover);
  var clear = new Sprite(267, 48);
  clear.image = core.assets['clear.png'];
  clear.x = 10;
  clear.y = 130;
  gameClearScene = new Scene();
  gameClearScene.addChild(clear);

  var map = new Map(16, 16);
  map.image = core.assets['map2.png'];
  var mapData = [
            [ 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18 ],
            [ 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19 ],
            [ 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19 ],
            [ 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19 ],
            [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
            [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
            [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21 ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
            [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ],
            [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ]
        ];
    map.loadData(mapData);
    core.rootScene.addChild(map);

    var Player = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 32, 32);
        this.x = x;
        this.y = y;
        this.frame = 60;
        this.image = core.assets['chara7.png'];

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        if (core.input.right) {
          this.x += 5;
        }
        if (core.input.left) {
          this.frame += 5
          this.x -= 5;
        }
        for (i = 0; i < enemies.length; i++) {
          if (enemies[i].presence == true && this.intersect(enemies[i])) this.die();
        }
        var self = this;
        document.onkeydown = function(e) {
          if (e.keyCode == 65) {
            self.throwBomb(1);
          }
          if (e.keyCode == 81) {
            self.throwBomb('up');
          }
          if (e.keyCode == 88) {
            self.throwBomb(3);
          }
          if (e.keyCode == 83) {
            self.throwBigBomb(1);
          }
          if (e.keyCode == 67) {
            self.throwBigBomb(3);
          }
        };

      },

      throwBomb: function(power) {
        if (power == 'up') {
          this.tl.cue({
            0: function() { bomb = new Bomb(this.x+3, this.y-30); },
            2: function() { bomb.tl.moveTo(this.x, this.y - 100, 3); },
            3: function() { bomb.tl.moveTo(this.x, this.y - 150, 2); },
            4: function() { bomb.tl.moveTo(this.x, this.y-50, 3); },
            4: function() { bomb.tl.moveTo(this.x, this.y+20, 1); }
          })
        } else {
          this.tl.cue({
            0: function() { bomb = new Bomb(this.x+3, this.y); },
            2: function() { bomb.tl.moveTo(this.x + 30 * power, this.y - 15 * power, 2); },
            3: function() { bomb.tl.moveTo(this.x + 50 * power, this.y - 5 * power, 1); },
            4: function() { bomb.tl.moveTo(this.x + 60 * power, this.y + 15, 0.1); }
          })
        }
      },

      throwBigBomb: function(power) {
        this.tl.cue({
          0: function() { bomb = new BigBomb(this.x+3, this.y); },
          2: function() { bomb.tl.moveTo(this.x + 30 * power, this.y - 15 * power, 2); },
          3: function() { bomb.tl.moveTo(this.x + 50 * power, this.y - 5 * power, 1); },
          4: function() { bomb.tl.moveTo(this.x + 60 * power, this.y + 15, 0.1); }
        })
      },

      die: function() {
        bgm.stop();
        soundGameOver.play();
        core.pushScene(gameOverScene);
        core.stop;
      }
    });

    // 敵機
    var Enemy = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 32, 32);
        this.x = x;
        this.y = y;
        this.frame = 18;
        this.image = core.assets['chara2.png'];
        this.life = 1;
        this.presence = true;

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        if (this.frame = 3) this.frame = 0;
        this.frame ++;
        this.x -= 4;
      },

      damage: function(power) {
        this.life -= power;
        if (this.presence == true && this.life <= 0) this.die();
      },

      die: function() {
        this.tl.removeFromScene();
        this.presence = false;
      }
    });

    var FlyEnemy = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 48, 48);
        this.x = x;
        this.y = y;
        this.frame = 2;
        this.image = core.assets['monster3.gif'];
        this.life = 1;
        this.presence = true;

        core.rootScene.addChild(this);
        this.tl.moveBy(30, 30, 20)
          .moveBy(-30, 30, 20)
          .loop();
      },

      onenterframe: function() {
        // if (this.frame = 3) this.frame = 0;
        // this.frame ++;
        // this.x -= 4;
      },

      damage: function(power) {
        this.life -= power;
        if (this.presence == true && this.life <= 0) this.die();
      },

      die: function() {
        this.tl.removeFromScene();
        this.presence = false;
      }
    });

    // 敵大
    var Boss = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 80, 80);
        this.x = x;
        this.y = y;
        this.frame = 2;
        this.image = core.assets['bigmonster1.gif'];
        this.life = 20;
        this.presence = true;

        core.rootScene.addChild(this);
        this.tl.moveBy(20, 20, 5)
          .moveBy(-20, -20, 5)
          .loop();
      },

      onenterframe: function() {
        if (this.frame = 10) this.frame = 2;
        this.frame ++;
        this.x -= 4;
      },

      damage: function(power) {
        this.life -= power;
        var frame = this.frame;
        this.frame = 7;
        setTimeout(function(){ this.frame = frame; }, 1000);
        if (this.presence == true && this.life <= 0) this.die();
      },

      die: function() {
        this.frame = 1
        setTimeout(function(){ this.frame = 0; }, 1000);
        this.tl.removeFromScene();
        this.presence = false;
      }
    });

    // 爆弾
    var Bomb = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        this.frame = 24;
        this.image = core.assets['icon0.png'];
        this.presence = true;

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        if (this.y >= 240) {
          this.explode();
        }
        for (i = 0; i < enemies.length; i++) {
          if (this.presence == true && enemies[i].presence == true && this.intersect(enemies[i])) {
            this.explode();
            enemies[i].damage(1);
          }
        }
      },

      explode: function() {
        this.image = core.assets['effect0.png'];
        this.tl.cue({
          0: function() { for (i=0; i<4; i++) this.frame = i; soundBomb.play();},
          3: function() { core.rootScene.removeChild(this); this.presence = false;}
        })
      }

    });

    // 大爆弾
    var BigBomb = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        this.frame = 24;
        this.image = core.assets['icon0.png'];
        this.presence = true;
        this.scale(3, 3);

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        var self = this;
        if (this.y >= 226) {
          setTimeout(function(){self.explode();}, 3000);
        }
      },

      explode: function() {
        this.image = core.assets['effect0.png'];
        soundBigBomb.play();
        this.scale(2.5, 2.5);
        this.tl.cue({
          0: function() {
            for (i=0; i<4; i++) {
              this.frame = i;
              for (i = 0; i < enemies.length; i++) {
                if (this.presence == true && enemies[i].presence == true && this.within(enemies[i], 90)) {
                  enemies[i].damage(3);
                }
                if (this.presence == true && this.within(player, 120)) {
                  player.die();
                }
              }
            }
          },
          3: function() { core.rootScene.removeChild(this); this.presence = false; this.image = core.assets['icon0.png'];}
        })
      }

    });

    var Goal = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 16, 16);
        this.x = x;
        this.y = y;
        this.frame = 31;
        this.image = core.assets['icon0.png'];

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        if (this.intersect(player)) this.gameClear();
      },

      gameClear: function() {
        bgm.stop();
        soundGameClear.play();
        core.pushScene(gameClearScene);
        core.stop;
      }

    });

    var player = new Player(100, 229);
    var goal = new Goal(280, 236);
    var enemies = [];
    for (i = 0; i < 50; i++) {
      enemies[i] = new Enemy(200+(30*i), 224);
    }
    for (i = 0; i < 5; i++) {
      enemies.push(new FlyEnemy(rand(300), 0));
    }
    enemies.push(new Boss(400, 150));
  }
  core.start();
};

function rand(n) {
  return Math.floor(Math.random() * (n+1));
}
