class LoginComponent{
    /**
     * 登录组件的构造器
     * @param {Object} loginSettings - 登录框的配置对象
     */
    constructor(loginSettings){
        this.loginSettings=loginSettings;
        this.nameFlag=0;
        this.pwdFlag=0;
        this.dispError("");
        
    }

    /**
     * 生成登录框的html字符串
     * @returns 登录框的html字符串
     */
    appendLogin(){
        let formHtml=this.makeLoginForm(this.loginSettings.formName,
                                   this.loginSettings.handleUrl,
                                   this.loginSettings.method,
                                   this.loginSettings.userName,
                                   this.loginSettings.userPwd,
                                   this.loginSettings.btnLogin);

        let imageHtml=this.makeLoginImage(this.loginSettings.imageUrl);
        let retLoginHtml=this.makeLogin(this.loginSettings.id,formHtml,imageHtml);
    
        return retLoginHtml;
    }

    /**
     * 组装好一个登录框
     * @param {String} id -登录框的id名
     * @param {String} formHtml - 登录框中form的html字符串
     * @param {String} imageHtml - 登录框右边的图像html字符串
     * @returns 登录框结构组成的html字符串
     */
    makeLogin(id,formHtml,imageHtml){
        let str="";
        str+="<div class=\"login\" id='"+id+"'>";
        str+=formHtml;
        str+=imageHtml;
        str+="</div>";
        return str;
    }

    /**
     * 
     * @param {String} name - 表单名
     * @param {String} url - php处理脚本
     * @param {String} method - 提交方式
     * @param {String} userName - 登录名命名
     * @param {String} userPwd - 密码命名
     * @param {String} btnLogin - 登录按钮的id命名
     * @returns 登录表单html串
     */
    makeLoginForm(name,url,method,userName,userPwd,btnLogin){
        let str="";
        str+="<form action=\""+url+"\" method=\""+method+"\" id=\""+name+"\" name=\""+name+"\">";
        str+="<input type=\"text\" placeholder=\"请输入用户名\" name=\""+userName+"\" id=\""+userName+"\">";
        str+="<input type=\"password\" placeholder=\"请输入密码\" name=\""+userPwd+"\" id=\""+userPwd+"\">";
        str+="<input type=\"button\" value=\"登录\" id=\""+btnLogin+"\">";
        str+="<div class=\"errors\" id=\"loginError\"></div>";
        str+="</form>";
        return str;
    }
    
    /**
     * 
     * @param {String} url - 登录框图像url
     * @returns 登录框的右边图像html串
     */
    makeLoginImage(url){
        let str="";
        str+="<div class=\"image\">";
        str+="<img src='"+url+"' alt=\"login-image\">";
        str+="</div>";
        return str;
    }

    /**
     * 
     * @param {Object} input - 要判断的input对象
     * @param {Number} index - 错误显示数组中的index
     * @returns 是否通过检验，true，通过；false，不通过
     */
    checkInputLen(input,index){
        let len=input.val().length;
        let arrs=['用户名不合法','密码不合法'];
        this.dispError("");
        if(len<6 || len<=0){
            this.dispError(arrs[index]);
            return false;
        }
        return true;
    }

    /**
     * 
     * @param {String} str - 登录过程中的错误显示
     */
    dispError(str){
        $("#loginError").text(str);
    }

    /**
     * 注册失去焦点事件
     */
    blurClick(){
        let _this=this;
        this.dispError("");
        $("#"+this.loginSettings.userName).on("blur",function(e){
            if(_this.checkInputLen($(this),0))  _this.nameFlag=1;
        });

        $("#"+this.loginSettings.userPwd).on("blur",function(e){
            if(_this.checkInputLen($(this),1))  _this.pwdFlag=1;
        });
    }

    /**
     * 注册登录按钮事件
     * @param {String} handler - 面板解析函数名
     */
    loginClick(handler){
        alert("asd");
        let _this=this;
        $("#"+this.loginSettings.btnLogin).on("click",function(e){
           
            if(_this.isPassCheck()){
                $.ajax(
                    {
                        async:false,
                        url:_this.loginSettings.handleUrl,
                        data:{
                            "name":$("#"+_this.loginSettings.userName).val(),
                            "pwd":$("#"+_this.loginSettings.userPwd).val()
                        },
                        type:_this.loginSettings.method,
                        success:function(res){
                            console.log(res);
                            if(res==1){
                                _this.getPanelData(_this,handler);
                            }else{
                                _this.dispError(_this.loginSettings.errors.panelError);
                            }
                           
                        }
                    }
                )
                
            }else{
                _this.dispError(_this.loginSettings.errors.loginError);
            }
            
        });
    }

    /**
     * 
     * @param {Object} _this 类对象
     * @param {String} handler 面板解析的函数名 
     */
    getPanelData(_this,handler){
         $.get(_this.loginSettings.dataUrl,'',function(res){
            let isPass=res[0].code;
            let data=res[0].data;
            if(isPass){
                handler(data);
            }else{
                _this.dispError(_this.loginSettings.errors.loginError);
            }
        },'json');
    }

    /**
     * 
     * @returns 登录框和密码框长度校验是否通过，true，通过；false，不通过
     */
    isPassCheck(){
        if(this.nameFlag && this.pwdFlag)
            return true;
        else
            return false;
    }
    
}
