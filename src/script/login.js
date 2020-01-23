class Login{
    constructor(){
        this.login_phonenum=$('input[name="login-phonenum"]');
        this.login_phonenum_span=$('.login-phonenum_span');
        this.login_yanzhengma_span1=$('.login-yanzhengma_span1');
        this.login_yanzhengma_span2=$('.login-yanzhengma_span2');
        this.login_yanzhengma=$('.login-yanzhengma');
        this.login_yanzhengma_hq=$('.login-yanzhengma_hq');
    }
    init(){
        let $flag=true;
        let _this=this;
        this.login_phonenum.on('blur',()=>{
            $.ajax({
                type:'post',
                url:'http://localhost/jialefu2/php/login.php',
                data:{
                    phonenum:_this.login_phonenum.val(),
                }
            }).done(function (result) {
                if (!result) {
                    _this.login_phonenum_span.html('该手机号码未注册').css('color', 'red');
                    $flag=false;
                } else {
                    _this.login_phonenum_span.html('√').css('color', 'green');
                    $flag=true;
                }
            });
        });
         //验证码
         this.login_yanzhengma_hq.on('click',()=>{
            let $str='';
            let $random=[0,1,2,3,4,5,6,7,8,9,'a','b','c' ,'d' ,'e' ,'f' ,'g' ,'h' ,'i' ,'j', 'k' ,'l' ,'m' ,'n' ,'o' ,'p' ,'q' ,'r' ,'s' ,'t' ,'u' ,'v' ,'w' ,'x' ,'y' ,'z'];
            for(var $i=0;$i<4;$i++){
                var $index=Math.floor(Math.random()*35);
                $str+=$random[$index];
            }
            _this.login_yanzhengma_span1.html($str);
        });
        //验证码验证
        this.login_yanzhengma.on('blur',()=>{
            if(_this.login_yanzhengma.val()!=''){
                if(_this.login_yanzhengma_span1.html()==_this.login_yanzhengma.val()){
                    _this.login_yanzhengma_span2.html('√').css('color', 'green');
                    $flag=true;
                }else{
                    _this.login_yanzhengma_span2.html('输入错误').css('color', 'red');
                    $flag=false;
                }
            }else{
                _this.login_yanzhengma_span2.html('验证码不能为空').css('color', 'red');
                $flag=false;
            }
        });
        // 点击提交按钮进行验证
        $('.login-tianxiekuang-center').on('submit',()=>{
            if(_this.login_phonenum.val()==''){
                _this.login_phonenum_span.html('手机号码不能为空').css('color', 'red');
                $flag=false;
            }
            if(_this.yanzhengma.val()==''){
                _this.login_yanzhengma_span2.html('验证码不能为空').css('color', 'red');
                $flag=false;
            }
            if(!$flag){
                return false;
            }
        })
    }
}

export{
    Login
}