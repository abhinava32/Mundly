var sec = 30;
const resendButtonToggle = function(){
    let string = "Resend OTP in "+ sec  + "sec" ;
    $('#resend-otp').text(string);
    if(sec == 0){
        $('#resend-otp').prop('disabled',false);
        $('#resend-otp').text('Resend OTP');
        clearInterval(timer);
    }
    
    sec = sec - 1;
    
}

$('#submit-btn').on('click',(event)=> {
    event.preventDefault();

    if(flag1){
        alert("sending OTP");
        
        $.ajax({
            type:"post",
            url: '/users/match-otp',
            data: $('form').serialize(),
            success: function(data){
                if(data.data.matched){
                    alert("matched OTP ");
                    window.location.href = "/users/reset-password";
                }
                else{
                    console.log(data.message);
                    $('#message').css("color","red");
                    $('#message').text(data.message);
                }

            }
        })   
    }
    else if(flag){
        $.ajax({
            type: 'post',
            url: '/users/send-otp',
            data: $('form').serialize(),
            success: function(data){
                if(data.data.found){
                    $('#submit-btn').text("Enter OTP");
                    $('#message').css("color","green");
                    $('#message').text(data.message);
                    $('#message').show();
                    $('#input-email').val('');
                    $('#input-email').attr('placeholder','Enter OTP Here');
                    $('form').attr('action','/users/reset-password');
                    flag1 = true;   
                    var timer = setInterval(resendButtonToggle, 1000);    
                }
                else{
                    console.log(data.message);
                    $('#message').css("color","red");
                    $('#message').text(data.message);
                }
            }
        });
    }
    else{
        alert("please enter a valid email address!!");
        return false;
    }
    
});

// $('#submit-btn-1').on(click,(event)=> {
//     event.preventDefault();
//     alert("clicked");
// })


const validateEmail = (email) => {
    console.log("called function");
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


        
const validate = () => {
    if(flag1){
        return true;
    }
    const $result = $('#result');
    const email = $('#input-email').val();
    console.log("email provided is ",email)
    $result.text('');
    
    if(validateEmail(email)){
        
        flag = true;
    } 
    else{
        
        flag = false;
    }
    return false;
}
var flag1 = false;
$('#input-email').on('input', validate);
$('#resend-otp').prop('disabled',true);
$('#message').text("");
var flag = false; 
