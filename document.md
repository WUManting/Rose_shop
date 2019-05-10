* module文件夹中装入模块文件

* D:\wampserver\Rose_shop\js\require.js    ===>配置模块

* index.html中,用绝对路径引入requeryjs  dist文件夹和src文件夹中的东西一致，其路径也相同

  ```html
  <script src="/libs/requirejs/require.min.js" data-main="/js/index"> 
  //require.min.js" ===>1.实现js文件的异步加载，避免网页失去响应；2.管理模块之间的依赖性，便于代码的编写和维护
  //"/js/index"===>当前业务逻辑的js
  //data-main属性的作用是，指定网页程序的主模块。
  ```

  

* 模块的面向对象--->构造函数

* 页面的面向对象--->class

* 如何加载header.html模块到a.html页面(jquery方式)

    	1.页面，模块已经写好，在config,js中配置模块(之前配置过就不再配置)

  ```javascript
  // config.js  配置模块
  require.config({
      baseUrl:"/",//根目录
      paths:{
          "jquery":"libs/jquery/jquery-3.2.1",
          "header":"js/module/header",
          "footer":"js/module/footer"
      }
  })
  ```

  ​	2.建立对应的a.js文件，

  ```javascript
  require(['require.config'],()=>{
      //require需要的模块，header,header模块中已经引入了jquery,所以在当前文件中，只需引入header就相当于引入了Jquery
      require(['header','footer'],()=>{
          console.log("a.html页请求成功！");
      })
  })
  ```

  ​	3.在a.html中引入该js文件(绝对路径引入)

  ```html
   <script src="/libs/requirejs/require.js" data-main="/js/a.js"></script>
  //或者
   <script src="/libs/requirejs/require.js" data-main="/js/a"></script>
  ```

  4.在a.html中引入a.css

    

  

* 登录：弹框-->js在module中完成

  ​	 页面-->js在单独页面完成

  