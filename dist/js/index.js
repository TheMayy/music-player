var dataList,len,control,timer,nowIndex=0,root=window.player,audio=root.AudioManager,controlIndex=root.indexControl,$scope=$("body");function getData(t){$.ajax({type:"GET",url:t,success:function(t){len=t.length,control=new controlIndex(len),dataList=t,root.rander(t[0]),audio.getAudio(t[0].audio),bindEvent(),bindTouch(),listStr(dataList),$("body").trigger("play:change",nowIndex)},error:function(){}})}function bindEvent(){$("body").on("play:change",function(t,o){root.pro.randerAllTime(dataList[o].duration),root.rander(dataList[o]),audio.getAudio(dataList[o].audio),"play"==audio.status&&(rotated(0),audio.play(),root.pro.start()),$(".img-box").attr("data-deg",0),$(".img-box").css({transform:"rotateZ(0deg)",transition:"none"})}),$(".prev").on("click",function(){nowIndex=control.prev(),$("body").trigger("play:change",nowIndex),listStr(dataList),"play"==audio.status?root.pro.start(0):root.pro.update(0)}),$(".next").on("click",function(){nowIndex=control.next(),$("body").trigger("play:change",nowIndex),listStr(dataList),"play"==audio.status?root.pro.start(0):root.pro.update(0)}),$(".play").on("click",function(){"pause"==audio.status?(audio.play(),root.pro.start(),rotated($(".img-box").attr("data-deg"))):(audio.pause(),root.pro.stop(),cancelAnimationFrame(timer));$(".play").toggleClass("playing")}),$(".like").on("click",function(){$(".like").toggleClass("liking")}),$(".list").on("click",function(t){"none"==$(".list-t").attr("display")?($(".list-t").css({display:"block"}),$(".list-t").attr("display","block")):($(".list-t").css({display:"none"}),$(".list-t").attr("display","none"))}),$(".list-t").on("click",function(t){"playing"!==$(t.target).attr("class")&&(root.rander(dataList[$(t.target).attr("index")]),$(t.target).addClass("playing").siblings().removeClass("playing"),audio.audio.src=dataList[nowIndex].audio),audio.audio.src=dataList[nowIndex].audio})}function bindTouch(){var n,i;$scope.find(".slider").on("touchstart",function(){var t=$(".pro-bottom").offset();n=t.left,i=$(".pro-bottom").width(),root.pro.stop()}).on("touchmove",function(t){var o=(t.changedTouches[0].clientX-n)/i;0<o&&o<=1&&root.pro.update(o)}).on("touchend",function(t){var o=(t.changedTouches[0].clientX-n)/i;if(0<o&&o<=1){var a=o*dataList[nowIndex].duration;audio.playTo(a),$scope.find(".play").addClass("playing"),audio.status="play",root.pro.start(o)}})}function rotated(o){cancelAnimationFrame(timer),o=+o,timer=requestAnimationFrame(function t(){o+=.1,$(".img-box").attr("data-deg",o),$(".img-box").css({transform:"rotateZ("+o+"deg)",transition:"all 1s ease-out"}),timer=requestAnimationFrame(t)})}function listStr(t){for(var o="",a=t.length,n=0;n<a;n++)o+=n==nowIndex?'<li class="playing"index='+n+">"+t[n].song+" - "+t[n].singer+"</li>":"<li index="+n+">"+t[n].song+" - "+t[n].singer+"</li>";$(".list-t").html(o)}getData("../mock/data.json");