require(['require.config'],()=>{
    require(['template','header','footer'],(template)=>{
        console.log("购物车页面加载成功！");
        class Cart{
            constructor(){
                this.init();
            }
            init(){
                this.cart=JSON.parse(localStorage.getItem('cart'));
                console.log(this.cart);
                if(this.cart){
                    //购物车不为空，渲染列表
                    this.render();

                }
            }
            render(){
                let cart = this.cart;
                console.log(cart);
                console.log(cart[0].imgs);
                $("#list-container").html(template('cart-template', {cart}));
            
            }
        }
        new Cart();
    })
})