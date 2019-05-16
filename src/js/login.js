require(['require.config'],()=>{
    //require需要的模块，header,header模块中已经引入了jquery,所以在当前文件中，只需引入header就相当于引入了Jquery
    require(['url','header','footer','cookie'],(url)=>{
        console.log("登录页请求成功！");
        class Login{
            constructor(){
                this.usernameInput=$("#inputUsername");
                this.passwordInput = $("#inputPassword");
                this.btn = $("#btn");
                this.checkbox=$("#checkbox");
                this.bindEvents();
            }
             bindEvents(){
                this.btn.on("click",()=>{
                    // 取用户名，密码，提交后台
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                        $.ajax({
                        url: url.phpBaseUrl + "user/login.php",
                        type: "post",
                        data: {username, password},
                        // 成功后的回调函数
                        success: data => {
                            console.log(data);
                            if(data.res_code === 1) {
                                this.loginSuccess(username);
                            }
                        },
                        dataType: 'json'
                    })
                })
               
            }
            loginSuccess(username){
                // 用户名存入cookie
                let expires = this.checkbox.prop('checked') ? {expires:7} : {};
                    expires = Object.assign({path: "/"}, expires);
                    console.log(expires);
                    $.cookie('username', username, expires);
                    alert('登录成功，即将跳转首页');
                    location.href = "/";//回到首页

            }



        }
        new Login();
    })
})