define(['jquery'],$=>{
    //console.log($);
    function Header(){
        this.container=$("#header-container");
        this.load();
       

    }
    // 对象合并header.prototype 和{}
    $.extend(Header.prototype,{
        //load 载入远程 HTML 文件代码,并插入至 DOM 中,路径用绝对路径
        load(){
            //函数调用完,就调用then方法.异步代码,写成同步形式
           this.container.load('/html/module/header.html', () => {
            //数据返回，header.html加载结束，才能运行
            this.search();
           });
           console.log("header");
           
        },
        // 搜索功能
        search(){
            

                
            
        }
        
        
       
    })
    return new Header();
});