$('.swiper-1').swiper({
    list: $('.focus-item-img'),
    type: 'fade',
    autoChange: true,
    autoTime: 3000,
    spotPosition: 'left',
    spotColor: 'gray'
})
$('.swiper-2').swiper({
    list: $('.focus-item__recommend'),
    type: 'fade',
    autoChange: true,
    autoTime: 10000,
    showSpotBtn: false,
    showChangeBtn: 'hover'
})
$('.seckill-list').swiper({
    list: $('.seckill-list-item'),
    type: 'animation',
    autoTime: 10000,
    showSpotBtn: false
})
$('.seckill-brand').swiper({
    list: $('.brand-item'),
    type: 'animation',
    autoTime: 2000,
    autoChange: true,
    showChangeBtn: 'hidden',
    spotPosition: 'center',
    spotSize: '5px'
})
$('.shortcut').load("./shortcut/index.html");

//引入搜索区域模块
$('.header').load("./header/index.html");

$('.fs-3').load("./fs/fs-3.html");
$('.fs-1').load("./fs/fs-1.html");
$('.seckill-countdown').load("./seckill/index.html")