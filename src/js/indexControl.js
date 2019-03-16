// 处理索引（要展示哪个音乐、图片）
// 普通处理方式和用算法处理
(function($,root) {
    function control(len) {
        this.index = 0;
        this.len = len;
    }
    control.prototype = {
        prev: function() {
            // if(this.index == 0){
            //     this.index = len - 1;
            // }else {
            //     this.index --;
            // }
            return this.getIndex(-1);
        },
        next: function() {
            // if(this.index == len - 1){
            //     this.index = 0;
            // }else {
            //     this.index ++;
            // }

            // getIndex为计算改变后的索引方法
            return this.getIndex(1);
        },
        getIndex: function(val) {
            // 当前索引
            var index = this.index;
            // 数据长度
            var len = this.len;
            // 计算后的索引
            var curIndex = (index + val + len) % len;           // 用算法计算索引
            this.index = curIndex;
            return curIndex;
        }
    }
    // 把构造函数暴露出去，可以传参，直接暴露实例无法传参
    root.indexControl = control;
})(window.Zepto,window.player || (window.player = {}))