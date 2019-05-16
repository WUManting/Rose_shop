require(['require.config'],()=>{
    require(['url','template','swiper','header','footer'],(url,template,Swiper)=>{
        class Index{
            constructor(){
                this.bindEvents();
                this.banner();
                this.indexGet();
            }
             //发送ajax请求数据
            indexGet(){
                $.ajax({
                    url:url.rapBaseUrl+"index/get",
                    method:"get",
                    dataType:"json",
                    success:data=>{
                        console.log(data);
                        if(data.res_code==1) this.render(data.res_body.list);
                    }

                })
            }
            render(list){
                console.log(list);
                $("#index-item").html(template("index-template",{list}));
                console.log(template("index-template",{list}));
            }
            //轮播图
            banner(){
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal', // 水平切换
                    loop: true, // 循环模式选项
                    speed:300,
                    autoplay:true,
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable:true,
                    
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }
                    
                    
                  })        
            }
            bindEvents(){
                // 由于login-btn是通过header模块的异步加载得到的，所以在这里同步代码获取不到，要使用事件委托
                $('#header-container').on('click',"#login-btn",()=>{
                    console.log(123);
                })
            }
        }
        
        new Index();
    })
});