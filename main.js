enchant();

window.onload = function() {
  var core = new Core(800, 800);
  core.preload(['chara7.png', 'chara2.png', 'icon0.png', 'monster4.gif', 'effect0.png']);
  core.fps = 10;
  core.onload = function() {
  gameOverScene = new Scene();
  gameOverScene.backgroundColor = 'black';

    // 自機
    var Player = Class.create(Sprite, {
      initialize: function(x, y) {
        Sprite.call(this, 32, 32);
        this.x = x;
        this.y = y;
        this.frame = 18;
        this.image = core.assets['chara7.png'];

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        if (core.input.right) this.x += 5;
        if (core.input.left) this.x -= 5;
        if (core.input.up) this.throwBomb();
        for (i = 0; i < enemies.length; i++) {
          if (this.intersect(enemies[i])) this.die();
        }
      },

      throwBomb: function() {
        this.tl.cue({
          0: function() { bomb = new Bomb(this.x+10, this.y+10); },
          2: function() { bomb.tl.moveBy(this.x+20, this.y, 10); }
        })
      },

      die: function() {
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

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        if (this.frame = 3) this.frame = 0;
        this.frame ++;
        this.x -= 3;
        if (this.life == 0) this.die();
      },

      damage: function() {
        this.life --;
      },

      die: function() {
        this.tl.removeFromScene();
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
        for (i = 0; i < enemies.length; i++) {
          if (this.presence == true && this.intersect(enemies[i])) {
            this.explode();
            enemies[i].damage();
          }
        }
      },

      explode: function() {
        this.image = core.assets['effect0.png'];
        this.tl.cue({
          0: function() { for (i=0; i<4; i++) this.frame = i; },
          3: function() { this.tl.removeFromScene(); this.presence = false;}
        })
      }

    });

    var player = new Player(100, 10);
    var enemies = [];
    for (i = 0; i < 10; i++) {
      enemies[i] = new Enemy(400+(30*i), 10);
    }
  }
  core.start();
};

function rand(n) {
  return Math.floor(Math.random() * (n+1));
}
