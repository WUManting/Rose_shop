require(['require.config'],()=>{
    //require需要的模块，header,header模块中已经引入了jquery,所以在当前文件中，只需引入header就相当于引入了Jquery
    require(['header','footer'],()=>{
        console.log("注册页请求成功！")
        // class Register{
        //     constructor(){
                
        //     }
        // }
    })
})