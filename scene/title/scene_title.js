class SceneTitle extends XScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = new Scene(game)
            game.replaceScene(s)
        })

        var title = XImage.new(game, 'title')
        this.addElement(title)
        title.x = 60
        title.y = 100
    }

    draw() {
        super.draw();
        var context = this.game.context
        context.font = "20px Microsoft YaHei"
        context.fillText('按 R 开始游戏', 90, 240)
    }
}