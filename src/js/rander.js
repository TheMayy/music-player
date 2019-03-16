// 实现页面渲染 img + info + like-btn

(function($,root) {
    function randerImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function() {
            root.blurImg(img,$('body'));
            $('.img-box img').attr('src',src);
        }
    }

    function randerInfo(info) {
        var str = '<div class="song-name">'+ info.song +'</div>\
        <div class="singer-name">'+ info.singer +'</div>\
        <div class="album-name">'+ info.album +'</div>';
        $('.song-info').html(str);
    }

    function randerIsLike(like) {
        if(like){
            $('.like').addClass('liking');
        }else {
            $('.like').removeClass('liking');
        }
    }

    root.rander = function(data){
        randerImg(data.image);
        randerInfo(data);
        randerIsLike(data.isLike);
    }
    
})(window.Zepto,window.player || (window.player = {}));       

// 传入zepto后不用每次都去window上找，提高效率
// 第二个参数传入另一个window对象来暴露接口，如果没有该对象就创建一个