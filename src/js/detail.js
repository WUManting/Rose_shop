require(['require.config'],()=>{
    require(['url','template','header','footer'],()=>{
        console.log("详情页请求成功！");
        class Detail{
            constructor(){
                this.init();
            }
            //详情页初始化
            init(){
                //通过location里面的参数，从url中取出id，携带id请求详情页数据，渲染详情页
                let id=location.search.slice(4);
                console.log(id);
            }
        }
        new Detail();
    })
})