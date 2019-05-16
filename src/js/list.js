//列表页业务逻辑
require(['require.config'],()=>{
    require(["url","template",'header','footer'],(url,template)=>{
        console.log("商品页请求成功！");
        console.log(url);
        class List{
            constructor(){
                this.getDeta();
            }
            //请求数据列表
            getDeta(){
                console.log(111);
                //发送ajax请求数据
                $.ajax({
                    url:url.rapBaseUrl+"list/get",
                    method:"get",
                    dataType:"json",//传输的数据格式 : text,html,json
                    success:data=>{
                        console.log(data);
                        if(data.res_code===1) this.render(data.res_body.list);
                    }//请求成功的回调
                
                })
            }
            render(list){
                console.log(list);
                $("#shopItem").html(template("list-template",{ list}));
            }
        }
        new List();
    })
})
//模板引擎：template
//参数： 1.要渲染的script的id;2.script里面要渲染的数据
// 返回值：渲染完成的html字符串，需要放入页面的容器盒子中
// document.querySelector("#list-item").innerHTML=template("list-template");