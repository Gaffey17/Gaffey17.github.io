/**
 * 两个问题：
 * 1.如何实现鼠标移入就有动画   不管移入几次
 *          解决方案： 可以每次hover的时候重新加载图片（重新加载图片的方法改变路径中的参数）
 * 2.动画结束完成 鼠标移出这个区域 动图立即消失
 * 
 * 3.动画还没有完成   鼠标就移出了  怎么能让动画结束之后再让动画消失
 * 
 * 解决以上三个问题的方法：
 *         在动图开始的时候添加class类名标志动图开始
 *         在动图结束的时候移出开始的标志  添加结束的标志
 *         在鼠标移出logo区域的时候  标志移出
 */
(function(){
    $('.logo').hover(function(){
        if(!$('.logo-bg').hasClass('animate-start')){
            $('.logo-title').removeClass('animate-end');
            $('.logo-bg').css({
                backgroundImage: 'url("http://img1.360buyimg.com/da/jfs/t1/31022/15/6795/70332/5c90a829E8c89e387/ee4f9471a2383d4a.gif?v=' + new Date().getTime()+'")'
            }).addClass('animate-start')
            setTimeout(function(){
                $('.logo-bg').removeClass('animate-start');
                $('.logo-title').addClass('animate-end');
            },5000)
        }
        $('.logo-title').addClass('show-bg');
    },function(){
        if(!$('.logo-bg').hasClass('animate-start')){
          $('.logo-title').addClass('animate-end');
          $('.logo-title').removeClass('show-bg')
        }
    })
    window.dealData = function (res){
        var data = res.result;
        var str = "";
        data.forEach(function(item){
            str += `<li>${item[0]}</li>`
        });
        $('.search-list').html(str).show()
    }
    var timer = null;
    $('#search-inp').on('input',function(){
        clearTimeout(timer);
        var val = $(this).val();
        timer = setTimeout(function(){
            $.ajax({
                url: "https://suggest.taobao.com/sug",
                data: {
                    code: 'utf-8',
                    q: val,
                    callback: 'dealData'
                },
                dataType: 'jsonp',
                type: 'get'
            })
        },500)
    }).click(function(){
        $('.search-list').show();
    });
    $('.search-box').mouseleave(function(){
        $('.search-list').hide();
    })
}())

//防抖： 是说  防止短时间内重复加载  也就是添加延迟加载
//节流： 是指当前如果有加载  则不进行下一次加载