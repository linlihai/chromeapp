console.log("content scripts");
/// -----   config
var id = '---用户---';
var pw = '---密码---'


var zj_12580_url = 'http://www.zj12580.cn/dept/6484';
var zj_ol_url = 'http://guahao.zjol.com.cn/DepartMent.Aspx?ID=9294';
var book_date = '2014\\.10\\.14'
// ------   config

var login_fetch = 0;

var login_index_zj_ol = function(){
    if(login_fetch > 0){
        return ;
    }
    $('#txtIdCode2').val(id);
    $('#txtPassword2').val(pw);
    $('#txtVerifyCode2').keyup(function(){
        if($(this).val() && $(this).val().length == 4)
            $('.loginin').children(0).children(0).click();
    });
    login_fetch ++;
}

var login_dialog_zj_ol = function(){
     if(login_fetch > 0){
        return ;
    }
    $('#txtsfz').val(id);
    $('#txtmima').val(pw);
    $('#txtloginyzm').keyup(function(){
         if($(this).val() && $(this).val().length == 4)
            $('#mesWindowContent').find('input:button')[0].click();
    });
    login_fetch ++;
}


if( window.location.hostname == 'guahao.zjol.com.cn' ){
    if($('#txtIdCode2').length == 1)
        login_index_zj_ol();

    // do after login.
    if($('img[src=images\\/tcdl\\.jpg]').length == 1){
        window.location = zj_ol_url
    }


    //  do click
    if($('img[src=images\\/yy\\.gif]').length > 0){
        $('img[src=images\\/yy\\.gif]')[0].click();


        // if not login before do login dialog
        var login_interval = setInterval(function(){
            if($('#txtsfz').length == 1){
                login_dialog_zj_ol();
                return ;
            } else {
                clearInterval(login_interval);
            }

        }, 100);


        var interval = setInterval(function(){
            // do lazy choose
            if($('#imgyzm').length > 0 && $('#imgyzm')[0].style.display == 'none'){
                var last = $('input[name=cb]').length;
                var choose =  parseInt(last * Math.random());
                $('input[name=cb]')[choose].click();
                $('#txtyzm').keyup(function(){
                    if($(this).val() && $(this).val().length == 5)
                        $('.yy_button').children(0).click();
                });
                //clearInterval(interval);
            }
        }, 100);

    }
}

// ------------ zj 12580
var zj_12580_login = function(){
    $('input[name=username]').val(id);
    $('input[name=password]').val(pw);
    $('input[name=captcha]').keyup(function(){
        if($(this).val() && $(this).val().length == 4)
            $('.btnlogin').click();
    });
}


var zj_12580_book = function(){
    zj_12580_check_login();
    if($('.btnyy').length > 0)
        $('.btnyy')[0].click();
    else
        setTimeout(function(){
//            window.location.reload();
        }, 10000)
}

var zj_12580_choose = function(){
    var total = $('input:radio').length;
    var index = parseInt(total * Math.random())
    $('input:radio')[index].click()
    $('.btnNext').click();

    // lazy click()
    var click_interval = setInterval(function(){
        if($('.click_box').style.display == 'none')
            return;
        $('input[onclick=checkform\\(\\)]').click();
        clearInterval(click_interval);
    }, 100);

}

var zj_12580_check = function(){

    $('input[name=code]').keyup(function(){
        if($(this).val() && $(this).val().length == 5)
            $('.btnNext').click();
    });
}

var zj_12580_check_login = function(){
    $('.userhelp').find('a').each(function(){
        if($(this).attr('href') && $(this).attr('href').indexOf('login') == 1){
            window.location = 'http://www.zj12580.cn'
        }
    })
}

//  zj 12580 main
if( window.location.hostname == 'www.zj12580.cn'){
    if( window.location.pathname == '/index' && $('.btnlogin').length  == 0){
        window.location = zj_12580_url;
    }
    if($('.btnlogin').length == 1){
        zj_12580_login();
    } else if(window.location.pathname.indexOf('dept') == 1){
        //book click
        zj_12580_book();
    } else if(window.location.pathname == '/order/num'){
        zj_12580_choose();
    } else if(window.location.pathname == '/order/check'){
        zj_12580_check()
    }
}

// ------------ zj 12580
