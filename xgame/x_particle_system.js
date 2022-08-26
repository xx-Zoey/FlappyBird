class XParticle extends XImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    // 设置位置,还有加速度（让烟花飞起来）
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}
//
class XParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        // 50帧就消失
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles = []
    }
    update() {
        this.duration--

        // 添加小烟花 小火花数量不超过 numberOfParticles
        if (this.particles.length < this.numberOfParticles) {
            var p = XParticle.new(this.game)
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // 临时方案，应该从 scene 中删除自己才对
            return
        }

        for (var p of this.particles) {
            p.draw()
        }
    }
}