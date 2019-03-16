// 进度条模块
// 渲染总时间和当前播放时间，更新进度条，拖拽，暂停
(function($,root) {
    var $scope = $(document.body);
    var curDuration,
        frameId,
        lastPer = 0;
    var startTime;
    function randerAllTime(time) {
        curDuration = time;
        time = formatTime(time);
        $scope.find('.all-time').html(time);
    }

    // 时间格式转换
    function formatTime(time) {
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time - m * 60;
        if(m < 10) {
            m = '0' + m;
        }
        if(s < 10) {
            s = '0' + s;
        }
        // console.log(m,s)
        return m + ':' + s;
    }

    // 已播放时间
    // 获取开始时间，用系统时间减去开始时间就是走过的时间

    function start(per) {
        cancelAnimationFrame(frameId);
        lastPer = per == undefined ? lastPer : per;
        startTime = new Date().getTime();
            // startTime = startTime.getTime();
        // 更新时间函数
        function frame() {
            var curTime = new Date().getTime();
                // startTime = startTime.getTime()
            // 计算当前时间占总时间的百分比
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            update(percent);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    // 暂停更新
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
    }

    // 从头
    function zero() {
        
    }


    // 渲染时间函数
    function update(per) {
        // 进度条移动距离
        var perX = (per - 1) * 100 + '%';
        var time = per * curDuration;
        // console.log(time,per,curDuration)
        // 转换时间格式
        time = formatTime(time);
        // 渲染
        $scope.find('.cur-time').html(time);
        $scope.find('.pro-top').css({
            transform: 'translateX(' + perX + ')'
        })
    }


    // 暴露函数
    root.pro = {
        randerAllTime: randerAllTime,
        start: start,
        update: update,
        stop: stop
    }
})(window.Zepto,window.player || (window.player = {}))

