// 管道
class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 120
        this.管子横向间距 = 300
        this.columsOfPipes = 3
        for (var i = 0; i < this.columsOfPipes; i++) {
            var p1 = XImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 300 + i * this.管子横向间距
            var p2 = XImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    static new(game) {
        return new this(game)
    }

    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-350, -150)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }

    update() {
        for (var i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5

            if (p1.x < -100) {
                p1.x += this.管子横向间距 * this.columsOfPipes
            }

            if (p2.x < -200) {
                p2.x += this.管子横向间距 * this.columsOfPipes
                this.resetPipesPosition(p1, p2)
            }
        }
    }

    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            // 围绕角色中心点旋转
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)

            context.restore()


        }
    }

    collide(b, i) {
        return (rectIntersects(this.pipes[i], b) || rectIntersects(b, this.pipes[i]))
    }
}
