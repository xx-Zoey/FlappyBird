class XAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (var i = 1; i < 4; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        // 存储的第一张图片
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        //
        this.frameIndex = 0
        this.frameCount = 3
        //
        this.flipX = false
        // 角度
        this.rotation = 0
        // 重力和加速度
        this.gy = 10
        this.vy = 0

    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2

        // 超过这个高度，小鸟不继续往下掉
        var h = 405
        if (this.y >= h) {
            this.y = h
        }

        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }


        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }

        //
        this.pipe = Pipes.new(this.game)
    }

    draw() {
        var context = this.game.context
            context.save()
            var w2 = this.w / 2
            var h2 = this.h / 2
            // 围绕角色中心点旋转
            context.translate(this.x + w2, this.y + h2)
            if (this.flipX) {
                context.scale(-1, 1)
            }
            context.rotate(this.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(this.texture, 0, 0)

            context.restore()

    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
    }
    changeAnimation(name) {
        this.animationName = name
    }

}