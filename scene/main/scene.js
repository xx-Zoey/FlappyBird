const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Scene extends XScene {
    constructor(game) {
        super(game)
        // 背景
        var bg = XImage.new(game, 'bg')
        this.addElement(bg)
        bg.x = 0
        bg.y = -110

        // 分数
        this.score = 0

        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)


        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = XImage.new(game, 'ground')
            g.x = i * 19
            g.y = 432
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        // 鸟
        this.birdSpeed = 2
        this.bird = XAnimation.new(game)
        this.bird.x = 100
        this.bird.y = 200
        this.addElement(this.bird)
        this.setupInputs()
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }

        for (var i = 0; i < this.pipe.pipes.length; i++) {
            var pipes = this.pipe.pipes[i]
            // 如果管子图片和小鸟图片发生碰撞 或者 小鸟头碰到了地面
            // 游戏就结束，跳转到结束场景
            if (this.pipe.collide(this.bird, i) || (this.bird.y === 405)) {
                var end = SceneEnd.new(this.game)
                this.game.replaceScene(end)
            }

            // 管子的 x 加上管子图片的 width 等于 小鸟的 x 时
            // 就加分
            if ((pipes.x + pipes.w === this.bird.x)){
                this.score += 0.5
            }
        }
        log(this.score)
    }

    setupInputs() {
        // this 是 SceneTitle
        var self = this
        var b = this.bird
        self.game.registerAction('a', function (keyStatus){
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus){
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus){
            b.jump()
        })
    }

    draw() {
        super.draw();
        // 添加「分数」在左下角
        var context = this.game.context
        context.font = "20px Microsoft YaHei"
        context.fillText('分数: '+ this.score, 10, 400)
    }
}