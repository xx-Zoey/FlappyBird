var __main = function() {
    var images = {
        bg:'img/bird/sky.png',
        b1: 'img/bird/bird-1.png',
        b2: 'img/bird/bird-2.png',
        b3: 'img/bird/bird-3.png',
        b4: 'img/bird/bird-4.png',
        ground: 'img/bird/ground.png',
        pipe: 'img/bird/pipe.png',
        gameover: 'img/bird/gameover.png',
        title:'img/bird/flappybird.png'

    }
    var game = XGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
}

__main()
