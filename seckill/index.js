(function(){
    var startTimeStr = "2020/08/29/ 22:00:00";

    var startTime = new Date(startTimeStr);
    var endTime = startTime.getTime() + 2 * 60 * 60 * 1000;
    var timer = setInterval(function(){
    var distTime = endTime - new Date().getTime();
    var hour = Math.floor(distTime / 1000 /60 / 60);
    var minute = parseInt(distTime / 1000 /60 % 60);
    var second = parseInt(distTime /1000 % 60);
    if(hour < 10){
        hour = '0' + hour;
    }
    if(minute < 10){
        minute = '0' + minute;
    }
    if(second < 10){
        second = '0' + second;
    }
    $('.timmer__unit--hour').text(hour);
    $('.timmer__unit--minute').text(minute);
    $('.timmer__unit--second').text(second);
},1000)
}())