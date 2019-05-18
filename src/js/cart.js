require(['require.config'],()=>{
    require(['template','header','footer'],(template)=>{
         class Cart{
            constructor(){
                this.init();
                this.Number();//购物车产品添加删除
                this.allMoney();//总价
                this.deteItem();// 删除单条项目
                this.cartClean(); // 清空购物车
            }
            init(){
                this.cart=JSON.parse(localStorage.getItem('cart'));
                // console.log(this.cart);
                if(this.cart){
                    //购物车不为空，渲染列表
                    this.render();
                    this.allMoney();
                }
            }
            // 渲染购物车
            render(){
                let cart = this.cart;
                // console.log(cart);
                // console.log(cart[0].imgs);
                $("#list-container").html(template('cart-template', {cart}));
            
            }
            Number(){
                let _this = this;
                $(".cart-container").on('click','.cart_up',function(e){
                    
                    // num=Number($(this).parent().prev().children().val());
                    let num=Number($(this).parents('tr').find('.shopping_cart_sl').val());
                    num++;
                    //操作cart++   
                    let cart =localStorage.getItem('cart');
                    cart=JSON.parse(cart);
                    let id = Number($(this).parents('tr').attr("data-id"));
                    let price=Number($(this).parents('tr').find('#price').text());
                 
                    $(this).parents('tr').find('#totalprice').text(price*num);
                    let index = -1;
                        // console.log(id);
                    if(cart.some((item,i)=>{
                        index=i;
                        return item.id===id;
                            })){
                                cart[index].num++;
                                localStorage.setItem('cart',JSON.stringify(cart));
                            }
                   
                    localStorage.setItem('cart',JSON.stringify(cart));
                    $(this).parents('tr').find('.shopping_cart_sl').val(num);
                    // console.log(_this);
                     _this.allMoney();
                    })
                $(".cart-container").on('click','.cart_down',(e) =>{
                    let target = e.target;
                    let num = Number($(target).parents('tr').find('.shopping_cart_sl').val());
                    num--;
                    //操作cart --
                    let cart=localStorage.getItem('cart');
                    cart=JSON.parse(cart);
                    let id=Number($(target).parents('tr').attr("data-id"));
                    let price=Number($(target).parents('tr').find('#price').text());
                    $(target).parents('tr').find('#totalprice').text(price*num);
                    let index=-1;
                    if(cart.some((item,i)=>{
                        index=i;
                        return item.id===id;
                            })){
                                cart[index].num--;
                                // num最小值为1
                                if(cart[index].num<1){
                                        cart[index].num=1;
                                    }
                                
                                localStorage.setItem('cart',JSON.stringify(cart));
                                _this.allMoney();
                            }
                    if(num<1){
                        num=1;
                    }
                    $(target).parents('tr').find('.shopping_cart_sl').val(num); 
                    this.allMoney();
                  
                  
                })
              
            }
            // 删除
            deteItem(){
                let _this=this;
                $(".cart-container").on('click','.cart_del',function(e){
                    // let target=e.target;
                    // let tr=$(target).parents("tr").parent();
                    // console.log(tr);
                    $(this).parents("tr").remove();



                    //删除cart,判断存在相同id的产品，就删除 
                    let num = Number($(this).parents('tr').find('.shopping_cart_sl').val());
                    let cart=localStorage.getItem('cart');
                    cart=JSON.parse(cart);
                
                    let id=Number($(this).parents('tr').attr("data-id"));
                    console.log(id);
                    
                   
                    let index=-1;
                    // 通过some方法，遍历cart,数组[]中的每个对象{}。返回id相等的对象
                    if(cart.some((item,i)=>{
                        index=i;
                        console.log(item.id);
                        return item.id===id;//三个等号或者两个等号都可以
                            })){
                                console.log(cart[index]);
                                cart.splice(index,1);
                                localStorage.setItem('cart',JSON.stringify(cart));
                                // console.log(11);
                                _this.allMoney();
                            }
                            
                    $(this).parents('tr').find('.shopping_cart_sl').val(num); 
                    
                    this.allMoney();
                })
            }
            // 总价
            allMoney(){
                let Money=0;
                let obj=document.getElementsByClassName("totalprice");
                //  $(this).parents('tr').find('#totalprice').text(price*num);
                let addMoney=new Array();
                for (let i=0;i<obj.length;i++){
                    addMoney[i]=obj[i].innerHTML;
                    Money+=Number(addMoney[i])
                }
               
                // let cart = localStorage.getItem('cart');
                // cart=JSON.parse(cart);
                // cart.forEach(function(item,index){
                //    console.log(item);
                //    let price=cart[index].price;
                //    let num=cart[index].num;
                //    Money+=price*num;
                //    console.log(price*num);

                // });                                                                                                                                                                                                                       
                $("#cart_total").text(Money);
               
            }
            // 清空购物车
            cartClean(){
                $(".cart-container").on('click','#car-clean',function(e){
                    console.log(1);
                    $(".shop-list").remove();
                    let cart=localStorage.getItem('cart');
                    cart=[];
                    localStorage.setItem('cart',JSON.stringify(cart));
                })
            }
            
        }
        new Cart();
    })
})