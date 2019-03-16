// 播放，暂停，加载音乐
(function($,root) {
    function AudioManager(src) {
        // 创建音频对象
        this.audio = new Audio();
        // console.log(src)
        this.src = src;
        // audio默认状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function(src) {
            this.audio.src = src;
            this.audio.load();
            console.log(src,audio.src);
        },
        playTo: function(time) {
            this.audio.currentTime = time;
            this.audio.play();
        }

    }
    // 直接暴露实例，无法传参
    root.AudioManager = new AudioManager();
})(window.Zepto,window.player || (window.player = {}))