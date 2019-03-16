var nowIndex = 0;
var root = window.player;
var dataList;
var len;
// audio为AudioManager构造函数的实例
var audio = root.AudioManager;
// controlIndex为构造函数control
var controlIndex = root.indexControl;
// 这里创建control变量来接收conotrolIndex（构造函数control）的实例
var control;
var timer;
var $scope = $('body');

// 获取数据
function getData(url) {
    $.ajax({
        type: 'GET',
        url:url,
        success: function(data) {
            console.log(data);
            len = data.length;
            control = new controlIndex(len);
            dataList = data;
            root.rander(data[0]);
            audio.getAudio(data[0].audio);
            bindEvent();
            bindTouch();
            listStr(dataList);
            $('body').trigger('play:change',nowIndex);
        },
        error: function() {
            console.log('error');
        }
    })
}

// 所有事件
function bindEvent() {
    // 自定义事件（必须传入事件原对象），
    $('body').on('play:change',function(e,index) {
        root.pro.randerAllTime(dataList[index].duration);
        root.rander(dataList[index]);
        audio.getAudio(dataList[index].audio);
        // audio.status ==  'play' ?  audio.play(): audio.pause() ;
        if(audio.status == 'play'){
            rotated(0);
            audio.play();
            root.pro.start();
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ(' + 0 + 'deg)',
            'transition':'none'
        })
    });
    $('.prev').on('click',function() {
        // nowIndex = root.indexControl.prev();
        nowIndex = control.prev();
    // 相同代码，可以优化,将代码放入一个自定义事件，点击事件中通过trigger方法触发该事件
        // root.rander(dataList[nowIndex]);
        // audio.getAudio(dataList[nowIndex].audio);
        // // 如果按钮是播放状态切歌直接播放
        // audio.status ==  'play' ?  audio.play(): audio.pause() ;

        // 触发play:change事件
        $('body').trigger('play:change',nowIndex);
        listStr(dataList);

        if(audio.status == 'play'){
            root.pro.start(0);
        }else {
            root.pro.update(0);
        }
    });
    $('.next').on('click',function() {
        // nowIndex = root.indexControl.next();
        nowIndex = control.next();
    // 相同代码，可以优化
        // root.rander(dataList[nowIndex]);
        // audio.getAudio(dataList[nowIndex].audio);
        // // 如果按钮是播放状态切歌直接播放
        // audio.status ==  'play' ?  audio.play(): audio.pause() ;

        $('body').trigger('play:change',nowIndex);
        listStr(dataList);
        if(audio.status == 'play'){
            root.pro.start(0);
        }else {
            root.pro.update(0);
        }
        
    });
    $('.play').on('click',function(){
        // console.log(audio);
        if(audio.status == 'pause'){
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }else {
            audio.pause();
            root.pro.stop();
            cancelAnimationFrame(timer);
        }
        $('.play').toggleClass('playing');
        
    })
    $('.like').on('click',function() {
        $('.like').toggleClass('liking');
    })
    $('.list').on('click',function(e) {
        if($('.list-t').attr('display') == 'none'){
            $('.list-t').css({
            'display':'block'
            });
            $('.list-t').attr('display','block')
        }else {
            $('.list-t').css({
                'display':'none'
            });
            $('.list-t').attr('display','none')
        }
    })
    $('.list-t').on('click',function(e) {
        console.log($(e.target).attr('class'));
        if( $(e.target).attr('class') !== 'playing'){
            root.rander(dataList[$(e.target).attr('index')]);
            $(e.target).addClass('playing')
                .siblings().removeClass('playing') ;
            audio.audio.src = dataList[nowIndex].audio;
        }
        audio.audio.src = dataList[nowIndex].audio;
    })
}


function bindTouch() {
    var $slider = $scope.find('.slider');
    var left,
        width;
    $slider.on('touchstart',function() {
        var offset = $('.pro-bottom').offset();
        // console.log(offset)
        left = offset.left;
        width = $('.pro-bottom').width();
        root.pro.stop();

    }).on('touchmove',function(e) {
        // 获得距离浏览器X轴的距离
        var x = e.changedTouches[0].clientX;
        // per是要移动的百分比
        var per = (x - left) / width;
        console.log(per)
        if(per > 0 && per <= 1) {
            // 渲染
            root.pro.update(per);
        }
        // console.log(x,left,per,width)
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        console.log(per)
        if(per > 0 && per <= 1) {
            var curTime = per * dataList[nowIndex].duration;
            audio.playTo(curTime);
            $scope.find('.play').addClass('playing');
            audio.status = 'play';
            root.pro.start(per);
        }
    })
}
// 图片旋转
function rotated(deg) {
    cancelAnimationFrame(timer);
    // var deg = 0;
    // 类型转换为数字
    deg = +deg;
    // 用requestAnimationFroam代替setinterval
    // requestAnimationFroam要一直执行需要在内部再调用一次
    timer = requestAnimationFrame(function fn() {
        deg +=0.1;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ(' + deg + 'deg)',
            'transition':'all 1s ease-out'
        })

        timer = requestAnimationFrame(fn);
    })
}

// 渲染项目列表
function listStr(data) {
    var str = '';
    var len = data.length;
    for(var i = 0; i < len; i++) {
        if(i == nowIndex) {
            str += '<li class="playing"'+ 'index='+ i +'>'+ data[i].song +" - "+ data[i].singer +  '</li>';
        }else {
            str += "<li index="+ i +'>'+ data[i].song +' - '+ data[i].singer +  '</li>';
        }
    }
    $('.list-t').html(str);
}


getData("../mock/data.json");

// 信息+图片渲染        rander
// 点击按钮
// 音频播放暂停、切歌
// 进度条运动与拖拽
// 图片旋转
// 列表切歌