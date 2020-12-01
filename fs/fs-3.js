$('.service_frame').mouseenter(function(){
    $(this).addClass('service_frame_on').siblings().removeClass('service_frame_on');
    $('.services').addClass('service_extend')
});
$('.close').click(function(){
    $('.service_frame_on').removeClass('service_frame_on');
    $('.services').removeClass('service_extend')
})