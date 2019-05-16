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

​    

*  模块里面用promise写异步，要做的操作放在then里面；页面要使用模块的DOM结构的话用事件委托完成
* 箭头函数  _this指外层函数，this指内部

* 登录：弹框-->js在module中完成

  ​	 页面-->js在单独页面完成

  # 接口文档

  * 首页类型请求

  

- 首页类型请求

  - baseurl-->自己的接口： http://rap2api.taobao.org/app/mock/166786/example/1556161952639 

    url-->首页的接口：http://www.****.com/api/v1/index/type

* 列表页接口

  * url-->后端的真实接口  ：http://www.****.com/api/v1/list/get

  * baseUrl-->前端虚拟接口(rap2)：<http://rap2api.taobao.org/app/mock/166786/list/get> 

  * method:get

  * data:{

    ​	}

* 详情页接口

  * url-->后端的真实接口  ：http://www.****.com/api/v1/detail/get

  * baseUrl-->前端虚拟接口(rap2)：<http://rap2api.taobao.org/app/mock/166786/list/get> 

  * method:get

  * query : {id}

  * data:{

    ​	}

* 注册接口

  * url：http://localhost/rosely/api/v1/user/register.php
  * method:post
  * query{username,password}
  * data{...}

* 登录接口要引入cookie，需要require了cookie之后才能使用cookie

* .header.js和login.js都需要cookie插件

* jquery对象  ；原生写法

* jquery里面提供的用来获取或者提供属性的方法 .attr()  .prop(),

* 清空购物车





























