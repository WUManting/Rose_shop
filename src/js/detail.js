require(['require.config'],()=>{
    require(['url','template','header','footer','zoom'],(url,template)=>{
        class Detail{
            constructor(){
                this.init();
                // zoom在的$的原型(prototype)上新增了elevateZoom方法。
                // $("div")-->就是$的实例，能够访问elevateZoom方法
                this.addCart();
            }
            //详情页初始化
            init(){
                //通过location里面的参数，从url中取出id，携带id请求详情页数据，渲染详情页
                let id=Number(location.search.slice(4));
                this.id=id;//加入购物车等事件需要id
                $.get(url.rapBaseUrl + "detail/get",{id},res=>{
                    if(res.res_code===1){
                        let {data}=res.res_body;//data展开为  {title："aaa",price:100}
                        // 接口为真实接口时，不需要上下两行代码
                        data={...data,id};//等价于 data.id=id.解构赋值，增加一个id字段{title："aaa",price:100，id:id}
                        this.render(data);
                    }
                })
            }
            render(data){
                // data<==>"data":data
                $("#detail-container").html(template("detail-template",{data}));
                this.zoom();
            }
            //购物车，事件委托
            addCart(){
                //列表页自定义属性，详情页不用
                $("#detail-container").on('click','#bar2', ()=>{
                    let cart =localStorage.getItem('cart');
                    console.log(cart);
                    if(cart){
                    //1.已经存过购物车，判断有木有当前商品
                    cart=JSON.parse(cart);

                    }else{
                    //2.购物车为空

                    }
                    //3.重新存cart
                    localStorage.setItem('cart',JSON.stringify(cart));
                })

            }
            zoom(){
                 // 放大镜插件
                 $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
            }
        }
        new Detail();
    })
})