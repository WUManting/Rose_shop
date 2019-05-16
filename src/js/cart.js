require(['require.config'],()=>{
    require(['template','header','footer'],(template)=>{
         class Cart{
            constructor(){
                this.init();
                this.Number();
                this.allMoney();
                this.deteItem();
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
                    console.log(_this);
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
                                // this.allMoney();
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
                $(".cart-container").on('click','.cart_del',(e)=>{
                    let target=e.target;
                    // let tr=$(target).parents("tr").parent();
                    // console.log(tr);
                    $(target).parents("tr").remove();



                    //删除cart 
                    let num = Number($(target).parents('tr').find('.shopping_cart_sl').val());
                    let cart=localStorage.getItem('cart');
                    cart=JSON.parse(cart);
                    let id=Number($(target).parents('tr').attr("data-id"));
                    let index=-1;
                    if(cart.some((item,i)=>{
                        index=i;
                        return item.id===id;
                            })){
                                cart.forEach(function(item,j){
                                console.log(item);
                                console.log(j);
                                // splice(id,1)

                                });
                                localStorage.setItem('cart',JSON.stringify(cart));
                                // this.allMoney();
                            }
                    $(target).parents('tr').find('.shopping_cart_sl').val(num); 
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
                // console.log(addMoney);
                // console.log(Money);



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
            
        }
        new Cart();
    })
})