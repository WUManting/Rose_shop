require(['require.config'],()=>{
    require(['template','header','footer'],(template)=>{
        console.log("购物车页面加载成功！");
        class Cart{
            constructor(){
                this.init();
            }
            init(){
                let cart=localStorage.getItem('cart');
                if(cart){
                    //购物车不为空，渲染列表
                    cart=JSON.parse(cart);
                    this.render(cart);

                }
            }
            render(cart){

            }
        }
        new Cart;
    })
})