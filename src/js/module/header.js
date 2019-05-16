define(['jquery','cookie'],$=>{
    //console.log($);
    function Header(){
        this.container=$("#header-container");
        this.load().then(()=>{
            this.search();
            this.isLogin();
            this.calcCartNUm();
        });
       

    }
    // 对象合并header.prototype 和{}
    $.extend(Header.prototype,{
        // //load 载入远程 HTML 文件代码,并插入至 DOM 中,路径用绝对路径
        // load(){
        //     //函数调用完,就调用then方法.异步代码,写成同步形式
        //    this.container.load('/html/module/header.html', () => {
        //     //数据返回，header.html加载结束，才能运行
        //     this.search();
        //    });
        load(){
            return new Promise(resolve=>{
                this.container.load('/html/module/header.html', () => {
                resolve();
               
            });
        })   
    },
        // 搜索功能
        search(){
            // //container内部的search
            // let form=this.container.find(".search");
            $("#search").on('keyup',function(){
                // this-->原生对象；$(this)-->Jquery对象
                let keyWords=$(this).val();
                // 带上关键字请求jsonp接口
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords,data=>{
                    console.log(data);
                    console.log(data.s);
                    var ul=document.querySelector(".list");
                    ul.innerHTML="";
                    for(var key in data.s){
                        var li=document.createElement("li");
                        var input=document.querySelector("#search");
                        li.innerHTML=data.s[key];
                        ul.appendChild(li);
                    }
                    ul.onclick=function(e){
                        e=e||event;  
                        var  target=e.target||e.srcElement;
                        if(target.nodeName==="LI"){
                            var list=target.innerHTML;
                            input.value=list;
                            ul.innerHTML="";
                        }                  
                    }
                })
            })
        },
        isLogin(){
            this.loginBtn=$('#login-btn');
            this.afterBtn=$('#after-login');
            this.nameSpan=$('#username-span');
            this.logout = $("#exit");
            let username=$.cookie("username");
            if(username) {
                console.log(this);
                
                this.loginBtn.hide();
                this.afterBtn.show();
                
                this.nameSpan.html(username);
              }else{
                this.loginBtn.show();
                this.afterBtn.hide();
              }
              this.logout.on("click", () => {
                // 退出登录
                if(confirm("确定要退出吗？")){
                  $.removeCookie("username", { path: '/' });
                //   $("div").removeAttr(".hidden-dlzc");
                  this.loginBtn.show();
                  this.afterBtn.hide();
                  this.nameSpan.html("");

                }
              })
        },
        calcCartNUm(){
            let cart=localStorage.getItem('cart');
            let num=0;
            if(cart){
                // 计算总数
                cart=JSON.parse(cart);
                // 总数量num,每个产品的数量n
                num=cart.reduce((n,shop)=>{
                    n+=shop.num;
                    return n;
                },0);
            }
            $('#cartNum').html(num);
        }
        
        
        
       
    })
    // 发出异步
    return new Header();
});