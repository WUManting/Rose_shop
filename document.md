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

* 登录：弹框-->js在module中完成

  ​	 页面-->js在单独页面完成