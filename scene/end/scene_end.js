class SceneEnd extends XScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })

        var gameover = XImage.new(game, 'gameover')
        this.addElement(gameover)
        gameover.x = 50
        gameover.y = 100
    }

    draw() {
        super.draw();
        var context = this.game.context
        context.font = "20px Microsoft YaHei"
        context.fillText('按 K 重开', 110, 240)
    }
}
