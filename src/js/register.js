require(['require.config'],()=>{
    //require需要的模块，header,header模块中已经引入了jquery,所以在当前文件中，只需引入header就相当于引入了Jquery
    require(['url','header','footer'],(url)=>{
        class Register{
            constructor(){
                this.usernameInput=$("#inputUsername");
                this.passwordInput = $("#inputPassword");
                this.btn = $("#btn");
                this.bindEvents();
            }
            bindEvents(){
                this.btn.on("click",()=>{
                    // 取用户名，密码，提交后台
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                        $.ajax({
                        url: url.phpBaseUrl + "user/register.php",
                        type: "post",
                        data: {username, password},
                        // 成功后的回调函数
                        success: data => {
                            if(data.res_code === 1) {
                                alert(data.res_message+", 即将跳转登录页");
                                location.href='login.html';
                            }
                        },
                        dataType: 'json'
                    })
                })
               
            }
        }

        new Register();
    })
})