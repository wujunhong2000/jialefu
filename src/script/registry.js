class Registry{
    constructor(){
        this.phonenum=$('input[name="phonenum"]');
        this.password1=$('input[name="password1"]');
        this.password2=$('input[name="password2"]');
        this.phonenum_span=$('.phonenum_span');
        this.password1_span=$('.password1_span');
        this.password2_span=$('.password2_span');
        this.yanzhengma_span1=$('.yanzhengma_span1');
        this.yanzhengma_span2=$('.yanzhengma_span2');
        this.yanzhengma=$('.yanzhengma');
        this.yanzhengma_hq=$('.yanzhengma_hq');
    }
    init(){
        let $flag=true;
        let _this=this;
        this.phonenum.on('blur',()=>{
            $.ajax({
                type:'post',
                url:'http://localhost/jialefu2/php/registry.php',
                data:{
                    phonenum:_this.phonenum.val(),
                }
            }).done(function (result) {
                if (!result) {
                    _this.phonenum_span.html('√').css('color', 'green');
                    $flag=true;
                } else {
                    _this.phonenum_span.html('该手机号码已注册').css('color', 'red');
                    $flag=false;
                }
            });
        })
        //验证码
        this.yanzhengma_hq.on('click',()=>{
            let $str='';
            let $random=[0,1,2,3,4,5,6,7,8,9,'a','b','c' ,'d' ,'e' ,'f' ,'g' ,'h' ,'i' ,'j', 'k' ,'l' ,'m' ,'n' ,'o' ,'p' ,'q' ,'r' ,'s' ,'t' ,'u' ,'v' ,'w' ,'x' ,'y' ,'z'];
            for(var $i=0;$i<4;$i++){
                var $index=Math.floor(Math.random()*35);
                $str+=$random[$index];
            }
            _this.yanzhengma_span1.html($str);
        })
        //验证码验证
        this.yanzhengma.on('blur',()=>{
            if(_this.yanzhengma_span1.html()==_this.yanzhengma.val()){
                _this.yanzhengma_span2.html('√').css('color', 'green');
                $flag=true;
            }else{
                _this.yanzhengma_span2.html('输入错误').css('color', 'red');
                $flag=false;
            }
        })
        // 密码框验证
        this.password1.on('blur',()=>{
            if(_this.password1.val().length>8 && _this.password1.val().length<=20){
                let count=0;
                let regnum = /\d+/;
                let reglower = /[a-z]+/; 
                let regupper = /[A-Z]+/; 
                if(regnum.test(_this.password1.val())){
                    count++;
                }
                if(reglower.test(_this.password1.val())){
                    count++;
                }
                if(regupper.test(_this.password1.val())){
                    count++;
                }
                if(count=='3'){
                    _this.password1_span.html('√').css('color', 'green');
                    $flag=true;
                }else{
                    $flag=false;
                    _this.password1_span.html('请输入8-20位的字母数字组合，字母需包含大小写').css('color', 'red');
                }
            }else{
                $flag=false;
                _this.password1_span.html('请输入8-20位的字母数字组合，字母需包含大小写').css('color', 'red');
            }
        })
        // 确认密码框验证
        this.password2.on('blur',()=>{
            if(_this.password2.val()==_this.password1.val()){
                _this.password2_span.html('√').css('color', 'green');
                $flag=true;
            }else{
                _this.password2_span.html('两次输入的密码不一致').css('color', 'red');
                $flag=false;
            }
        })
        // 点击提交按钮进行验证
        $('form').on('submit',()=>{
            if(_this.phonenum.val()==''){
                _this.phonenum_span.html('手机号码不能为空').css('color', 'red');
                $flag=false;
            }
            if(_this.password1.val()==''){
                _this.password1_span.html('密码不能为空').css('color', 'red');
                $flag=false;
            }
            if(_this.password2.val()==''){
                _this.password2_span.html('密码不能为空').css('color', 'red');
                $flag=false;
            }
            if(_this.yanzhengma.val()==''){
                _this.yanzhengma_span2.html('验证码不能为空').css('color', 'red');
                $flag=false;
            }
            if(!$flag){
                return false;
            }
        })
    }
}

export{
    Registry
}