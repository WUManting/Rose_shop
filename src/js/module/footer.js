define(['jquery'],$=>{
    function Footer(){
        this.container=$("#footer-container");
        this.load();
    }
    $.extend(Footer.prototype,{
        load(){
            this.container.load('/html/module/footer.html',()=>{
                console.log("footer");
            })
        }
    })
    return new Footer();
});