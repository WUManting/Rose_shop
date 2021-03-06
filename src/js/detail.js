require(['require.config'],()=>{
    require(['url','template','header','footer','zoom','fly'],(url,template,header)=>{
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
                // this.id=id;//加入购物车等事件需要id
                $.get(url.rapBaseUrl + "detail/get",{id},res=>{
                    if(res.res_code===1){
                        let {data}=res.res_body;//data展开为  {title："aaa",price:100}
                        // 接口为真实接口时，不需要上下两行代码
                        data={...data,id};//等价于 data.id=id.解构赋值，增加一个id字段{title："aaa",price:100，id:id}
                        this.data=data;
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
                $("#detail-container").on('click','.up',e=>{
                    let num = Number($('.up').parent().prev().val());
                    num=num+1;
                     $('.input').val(num);
                    // console.log(num);

                })
                $("#detail-container").on('click','.down',e=>{
                    let num = Number($('.down').parent().prev().val());
                    num=num-1;
                    if(num<1){
                        num=1;
                    }
                    $('.input').val(num);
                    // console.log(num);
                    
                })


                //列表页自定义属性，详情页不用
                $("#detail-container").on('click','.bar2',e =>{

                    // 购物车抛物线动画
                     $(`<img src='${this.data.imgs[0]}' style='width:30px;height:30px'/>`).fly({
                        start: {
                            left: e.clientX,
                            top: e.clientY
                        },
                        end: {
                            left: $("#cartNum").offset().left,
                            top: $("#cartNum").offset().top
                        // left: 1300,
                        // top: 300
                        },
                        onEnd: function () {
                            this.destroy(); //销毁抛物体
                            header.calcCartNUm(); // 再调用一次计算购物车数量的方法，避免刷新
                         }
                     });


                //购物车数量     
                    let cart =localStorage.getItem('cart');
                    
                    let index=-1;
                    let a=Number($('.input').val());
                    console.log(a);
                    if(cart){
                    //1.已经存过购物车，判断有木有当前商品
                   cart=JSON.parse(cart);
                   if(cart.some((shop,i)=>{
                            index=i;//index的值最后等于满足条件的值
                            return shop.id===this.data.id;
                            })){
                                //a.已经存过
                                cart[index].num= cart[index].num+a;

                            }else{
                                // b.没有存过
                                cart.push({...this.data,num:a});
                            }


                    
                    }else{
                    //2.购物车为空
                    cart=[{...this.data , num:a}];

                    }
                    //3.加入购物车后，重新存cart
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