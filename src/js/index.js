require(['require.config'],()=>{
    require(['header','footer'],()=>{
        console.log(111);
        class Index{
            constructor(){
                this.bindEvents();
                // this.banner();
            }
            bindEvents(){
                // 由于login-btn是通过header模块的异步加载得到的，所以在这里同步代码获取不到，要使用事件委托
                $('#header-container').on('click',"#login-btn",()=>{
                    console.log(123);
                })
            }
        }
        //轮播图
        // banner(){

        // }
        new Index();
    })
});