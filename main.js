enchant();

window.onload = function() {
  var core = new Core(320, 320);
  core.preload(['chara7.png', 'chara2.png', 'icon0.png', 'monster4.gif', 'effect0.png', 'clear.png', 'map2.png']);
  core.fps = 10;
  core.onload = function() {
  gameOverScene = new Scene();
  gameOverScene.backgroundColor = 'black';
  var clear = new Sprite(267, 48);
  clear.image = core.assets['clear.png'];
  clear.x = 10;
  clear.y = 130;
  gameClearScene = new Scene();
  gameClearScene.addChild(clear);

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
          if (enemies[i].presence == true && this.intersect(enemies[i])) this.die();
        }
      },

      throwBomb: function() {
        this.tl.cue({
          0: function() { bomb = new Bomb(this.x+3, this.y+10); },
          2: function() { bomb.tl.moveBy(this.x+1, this.y, 10); }
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
        this.presence = true;

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        if (this.frame = 3) this.frame = 0;
        this.frame ++;
        this.x -= 4;
      },

      damage: function() {
        this.life --;
        if (this.presence == true && this.life == 0) this.die();
      },

      die: function() {
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
        for (i = 0; i < enemies.length; i++) {
          if (this.presence == true && enemies[i].presence == true && this.intersect(enemies[i])) {
            this.explode();
            enemies[i].damage();
          }
        }
      },

      explode: function() {
        this.image = core.assets['effect0.png'];
        this.tl.cue({
          0: function() { for (i=0; i<4; i++) this.frame = i; },
          3: function() { core.rootScene.removeChild(this); this.presence = false;}
        })
      }

    });

    // ゴール
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
        core.pushScene(gameClearScene);
        core.stop;
      }

    });

    var player = new Player(100, 10);
    var goal = new Goal(280, 10);
    var enemies = [];
    for (i = 0; i < 20; i++) {
      enemies[i] = new Enemy(200+(30*i), 10);
    }
  }
  core.start();
};

function rand(n) {
  return Math.floor(Math.random() * (n+1));
}
