enchant();

window.onload = function() {
  var core = new Core(800, 800);
  core.preload(['chara7.png', 'chara2.png', 'icon0.png', 'monster4.gif']);
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
        if (this.intersect(enemy)) this.die();
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
        this.x -= 5;
        if (this.intersect(bomb)) this.damage();
        if (this.life == 0) this.die();
      },

      damage: function() {
        this.life --;
      },

      die: function() {

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

        core.rootScene.addChild(this);
      },

      onenterframe: function() {
        // if (this.intersect(enemy)) this.die();
      }

    });

    var player = new Player(100, 10);
    var enemy = new Enemy(400, 10);
    var bomb = new Bomb(200, 10);
  }
  core.start();
};

function rand(n) {
  return Math.floor(Math.random() * (n+1));
}
