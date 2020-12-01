
/**
 * 
 * @param {String} method 请求方式
 * @param {String} url    请求地址
 * @param {String} data   请求数据  key=value&key1=value1
 * @param {Function} cb     成功的回调函数
 * @param {Boolean} isAsync 是否异步 true
 */
function ajax(method, url, data, cb, isAsync) {
    // get   url + '?' + data
    // post 
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // xhr.readyState    1 - 4  监听是否有响应
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
            if (xhr.status == 200) {
                cb(JSON.parse(xhr.responseText))
            }
        }
    }

    if (method == 'GET') {
        xhr.open(method, url + '?' + data, isAsync);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, isAsync);
        // key=value&key1=valu1
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }


}
var tableData = [];
var nowPage = 1;
var pageSize = 5;
var allPage = 1;
//所有的事件绑定
function bindEvent(){
    var menu = document.querySelector('.menu');
    menu.onclick = function(e){
        if(e.target.tagName.toLowerCase() === 'dd'){
            var id = e.target.getAttribute('data-id');
            var content = document.getElementById(id);
            content.style.display = 'block';
            e.target.classList.add('active');
            var targetSiblings = getSiblings(e.target);
            for(var i = 0; i < targetSiblings.length;i++){
                targetSiblings[i].classList.remove('active');

            }
            var contentSiblings = getSiblings(content);
            for(var i = 0;i < contentSiblings.length;i++){
                contentSiblings[i].style.display = 'none';
            }
        }
    }
    //欢迎界面点击跳转页面
    var icon =document.querySelector('.icon');
    icon.onclick = function(e){
        if(e.target.classList.contains('c1')){
            var Id1 = document.querySelector('.student-list');
            var dd1 = document.querySelector('.d1');
            var dd0 = document.querySelector('.d0');
            // console.log(dd0);
            var self = document.querySelector('.student-Welcome');
            // console.log(Id1);
            self.style.display = 'none';
            Id1.style.display = 'block';
            dd1.classList.add('active');
            dd0.classList.remove('active');
        }else if(e.target.classList.contains('c2')){
            var Id2 = document.querySelector('.student-add');
            var dd2 = document.querySelector('.d2');
            var dd0 = document.querySelector('.d0');
            // console.log(dd0);
            var self = document.querySelector('.student-Welcome');
            // console.log(Id1);
            self.style.display = 'none';
            Id2.style.display = 'block';
            dd2.classList.add('active');
            dd0.classList.remove('active');
        }else if(e.target.classList.contains('c3')){
            var Id3 = document.querySelector('.student-search');
            var dd3 = document.querySelector('.d3');
            var dd0 = document.querySelector('.d0');
            // console.log(dd0);
            var self = document.querySelector('.student-Welcome');
            // console.log(Id1);
            self.style.display = 'none';
            Id3.style.display = 'block';
            dd3.classList.add('active');
            dd0.classList.remove('active');
        }else if(e.target.classList.contains('c4')){
            var Id4 = document.querySelector('.send-actor');
            var dd4 = document.querySelector('.d4');
            var dd0 = document.querySelector('.d0');
            // console.log(dd0);
            var self = document.querySelector('.student-Welcome');
            // console.log(Id1);
            self.style.display = 'none';
            Id4.style.display = 'block';
            dd4.classList.add('active');
            dd0.classList.remove('active');
        }
    }
    //增加学生按钮
    var addStudentBtn = document.getElementById('addBtn');
    // console.log(addStudentBtn);
    addStudentBtn.onclick = function(e){
        // console.log(111);
        e.preventDefault();
        // console.log(111);
        var studentAddForm = document.getElementById('add-student-form');
        var result = getFormData(studentAddForm);
        console.log(result);
        if(result.status === 'success'){
            // var data = "";
            // for(prop in result.data){
            //     data += prop + "=" + result.data[prop] + "&";
            // }
            // data += "appkey=Gaffey_1596518101391";
            // ajax("GET","http://open.duyiedu.com/api/student/addStudent",data,function(response){
            //     if(response.status === 'success'){
            //         alert('添加学生成功');
            //         location.reload();
            //     }else{
            //         alert(response.msg);
            //     }
            // },true);
            transferRequest("GET","/api/student/addStudent",result.data,function(){
                    alert('添加学生成功');
                    // getTableData();
                    location.reload();
            });
        }else{
            alert(result.msg);
        }
    }
    var tBody = document.getElementById('tBody');
    var modal = document.querySelector('.modal');
    tBody.onclick = function (e){
        if(e.target.classList.contains('edit')){
            // console.log('编辑按钮');
            // var index = getBtnIndex(e.target);
            var pageIndex = getBtnIndex(e.target);
            var index = (nowPage - 1) * pageSize + pageIndex;
            modal.style.display = 'block';
            renderEditForm(tableData[index]);
        }else if(e.target.classList.contains('remove')){
            var pageIndex = getBtnIndex(e.target);
            // console.log(index);
            var index = (nowPage - 1) * pageSize + pageIndex;
            var isDel = confirm("确认删除学号为" + tableData[index].sNo +"的信息吗?");
            if(isDel){
                transferRequest("GET","/api/student/delBySno",{
                    sNo: tableData[index].sNo
                },function(res){
                    alert('删除成功');
                    // getTableData();
                    // location.reload();
                    getTableData();
                })
            }
            // console.log('删除按钮',index);
        }
    }
    modal.onclick = function(e){
        // this.style.display = 'none';
        if(e.target === this){
            this.style.display = 'none';
        }
    }
    //编辑表单提交
    var editBtn = document.getElementById('editBtn');
    editBtn.onclick = function(e){
        e.preventDefault();
        var editform = document.getElementById('edit-student-form');
        var result = getFormData(editform);
        // console.log(editform);
        if(result.status === 'success'){
            transferRequest("GET","/api/student/updateStudent",result.data,function(){
                alert('修改成功');
                modal.style.display = 'none';
                getTableData();
            });
        }else{
            alert(result.msg);
        }
    }
    //翻页
    var turnPage = document.querySelector('.turn-Page');
    turnPage.onclick = function (e){
        if(e.target.classList.contains('prev-Btn')){
            nowPage --;
            var data = tableData.filter(function(item,index){
                return index >=(nowPage - 1) * pageSize && index <= nowPage *pageSize - 1;
            })
            renderTableData(data);
        }else if(e.target.classList.contains('next-Btn')){
            nowPage ++;
            var data = tableData.filter(function(item,index){
                return index >=(nowPage - 1) * pageSize && index <= nowPage *pageSize - 1;
            })
            renderTableData(data);
        }else if(e.target.classList.contains('mathPage')){
            //  console.log(allPage);
            for(var i=1;i < allPage+1;i++){
                if(e.target.classList.contains(i)){
                    var data = tableData.filter(function(item,index){
                        return index >=(i - 1) * pageSize && index <= i *pageSize - 1;
                    })
                }
            }
            renderTableData(data);
         }

    }


}
//获取兄弟节点
function getSiblings(node){
    var parentNode = node.parentNode;
    var children = parentNode.children;
    var siblings = [];
    for(var i = 0;i < children.length;i++){
        if(children[i] != node){
            siblings.push(children[i]);
        }
    }
    return siblings;
}
bindEvent();
/**
 * 
 * @param {*} form 
 * return {data:{},msg:'',status:'success'}
 */
//获取表单数据
function getFormData(form){
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var sNo = form.sNo.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    var result = {
        data: {},
        msg: '',
        status: 'success'
    }
    if(!name || !email || !sNo || !birth || !phone || !address){
        result.status = 'fail';
        result.msg = '信息填写不全，请校验后再提交';
        return result;
    }
    var emailReg = /^[\w.]+@[\w.]+\.(com|cn|net)$/
    if(!email.match(emailReg)){
        result.status = 'fail';
        result.msg = '邮箱格式不正确';
        return result;
    }
    var sNoReg = /^\d{4,16}$/;
    if(!sNoReg.test(sNo)){
        result.status = 'fail';
        result.msg = '学号必须为4~16位数字';
        return result;
    }
    //1970 - 2020
    if(birth < 1970 || birth >= 2020){
        result.status = 'fail';
        result.msg = '我们只招收1970年以后出生的人，未满一周岁不收';
        return result;
    }
    var phoneReg = /^1[3456789]\d{9}$/;
    if(!phoneReg.test(phone)){
        result.status = 'fail';
        result.msg = '手机号有误';
        return result;
    }
    result.data = {
        name,
        sex,
        sNo,
        phone,
        email,
        birth,
        address
    }
    return result;

}
//获取表格数据
function getTableData(){
    // ajax("GET","http://open.duyiedu.com/api/student/findAll","appkey=Gaffey_1596518101391",function(response){
    //     console.log(response);
    //     renderTableData(response.data);
    // },true);
    transferRequest("GET","/api/student/findAll","",function(response){
        tableData = response.data;
        allPage = Math.ceil(tableData.length / pageSize);
        numPage(allPage);
        //获取到第nowPage页的数据  数据条数 pageSize
        var data = tableData.filter(function(item,index){
            return index >=(nowPage - 1) * pageSize && index <= nowPage *pageSize - 1;
        })
        renderTableData(data);
    });
}
getTableData();
//渲染表格数据
function renderTableData(data){
    var tBody = document.getElementById('tBody');
    var str = "";
    data.forEach(function(item){
        str += ` <tr>
        <td>${item.sNo}</td>
        <td>${item.name}</td>
        <td>${item.sex == 0 ? '男' : '女'}</td>
        <td>${item.email}</td>
        <td>${new Date().getFullYear() - item.birth}</td>
        <td>${item.phone}</td>
        <td>${item.address}</td>
        <td>
            <button class="edit btn">编辑</button>
            <button class="remove btn">删除</button>
        </td>
    </tr>`
    });
    tBody.innerHTML = str;
    var prevBtn = document.querySelector('.prev-Btn');
    var nextBtn = document.querySelector('.next-Btn');
    if(nowPage > 1){
        prevBtn.style.display = 'inline-block';
    }else{
        prevBtn.style.display = 'none';
    }
    if(nowPage < allPage){
        nextBtn.style.display = 'inline-block';
    }else{
        nextBtn.style.display = 'none';
    }     
}
/**
 * 
 * @param {*} method 方法
 * @param {*} path   接口路径
 * @param {*} data   请求的数据
 * @param {*} cb     函数
 */
function transferRequest(method,path,data,cb){
    var strData = "";
    if(typeof data === 'object'){
        for(var prop in data){
            strData += prop + "=" + data[prop] + "&";
        }
        strData = strData.slice(data.length - 1);
    }else{
        strData = data;
    }
    strData += "appkey=Gaffey_1596518101391";
    ajax(method,"http://open.duyiedu.com" + path,strData,function(response){
        if(response.status === 'success'){
            cb(response);
        }else{
            alert(response.msg);
        }
    },true);
   
}
//获取按钮的索引值
function getBtnIndex(node){
    var trNode = node.parentNode;
    while(trNode && trNode.tagName.toLowerCase() !== 'tr'){
        trNode = trNode.parentNode;
    }
    if(!trNode){
        alert('点击按钮的父节点中没有找到tr标签');
        return false;
    }
    var trNodeSiblings = trNode.parentNode.children;
    for(var i = 0;i < trNodeSiblings.length;i++){
        if(trNodeSiblings[i] === trNode){
            return i;
        }
    }
}

//数据回填  渲染编辑表单数据
function renderEditForm(data){
    var form = document.getElementById('edit-student-form');
    for(var prop in data){
        if(form[prop]){
            form[prop].value = data[prop];
        }
    }
}

//渲染翻页分页数
function numPage(num){
    var strP = "";
  for(var i = 1;i < num+1;i++){
      strP +=`<span class="mathPage ${i}">${i}</span>  `;
  }
//   var Page = document.querySelector('#Page');
//   Page.innerHTML = strP;
    $(".next-Btn").before(strP);
}

//获取筛选到的数据
function FilterData(data){
    var index = document.getElementById("search-People").selectedIndex;
    let text = document.getElementById("search-People").options[index].text;
    var sendtext = document.getElementById('send-text');
    if(text === "学号"){
       var newData = data.filter(function(dt){
            for(let i = 0;i < data.length;i++){
                if(dt.sNo === sendtext.value){
                  return dt;
                }
            }
        })
        return newData;
    }
    if(text === "姓名"){
        var newData = data.filter(function(dt){
            for(let i = 0;i < data.length;i++){
                if(dt.name === sendtext.value){
                  return dt;
                }
            }
        })
        return newData;
    }
    if(text === "地址"){
        var newData = data.filter(function(dt){
            for(let i = 0;i < data.length;i++){
                if(dt.address === sendtext.value){
                  return dt;
                }
            }
        })
        return newData;
    }
    if(text === "邮箱"){
        var newData = data.filter(function(dt){
            for(let i = 0;i < data.length;i++){
                if(dt.email === sendtext.value){
                  return dt;
                }
            }
        })
        return newData;
    }
    if(text === "年龄"){
        var newData = data.filter(function(dt){
            for(let i = 0;i < data.length;i++){
                if(dt.birth === sendtext.value){
                  return dt;
                }
            }
        })
        return newData;
    }
    if(text === "手机号"){
        var newData = data.filter(function(dt){
            for(let i = 0;i < data.length;i++){
                if(dt.phone === sendtext.value){
                  return dt;
                }
            }
        })
        return newData;
    }
}


//渲染筛选到的表格数据
function renderFilterTable(data){
    var searchBody = document.getElementById('searchBody');
    var str = "";
    data.forEach(function(item){
        str += ` <tr>
        <td>${item.sNo}</td>
        <td>${item.name}</td>
        <td>${item.sex == 0 ? '男' : '女'}</td>
        <td>${item.email}</td>
        <td>${new Date().getFullYear() - item.birth}</td>
        <td>${item.phone}</td>
        <td>${item.address}</td>
        <td>
            <button class="edit btn">编辑</button>
            <button class="remove btn">删除</button>
        </td>
    </tr>`
    });
    searchBody.innerHTML = str;
}
       //搜索查询功能
   var select = document.querySelector('#search-People');
   var submit = document.querySelector('#submit');
   var obj = document.getElementById("search-People");
   // console.log(submit);
   submit.onclick = function(e){
       transferRequest("GET","/api/student/findAll","",function(response){
        var newData = FilterData(response.data);
         renderFilterTable(newData);
       });
   }






