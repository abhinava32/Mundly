var flag1 = false;
var flag2 = false;


const validateEmail = (email) => {
    console.log("called function");
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
    
    const validate = () => {
    const $result = $('#result');
    const email = $('#input-email').val();
    console.log("email provided is ",email)
    $result.text('');
    
    if(validateEmail(email)){
        $('#email-x').hide();
        $('#email-tick').show();
        $result.text(email + ' is valid.');
        $result.css('color', 'green');
        flag1 = true;
    } else{
        $('#email-x').show();
        $('#email-tick').hide();
        $result.text(email + ' is invalid.');
        $result.css('color', 'red');
        flag1 = false;
    }
    return false;
    }

$('#input-email').on('input', validate);


const match = () => {
    const first = $('#input-password').val();
    const second = $('#input-confirm-password').val();
    
    if(first == second && first.length > 0 ){
        $('#password-tick').show();
        $('#password-x').hide();
        flag2 = true;
    }
    else{
        $('#password-tick').hide();
        $('#password-x').show();
        flag2 = false;
    }

}

$('#input-confirm-password').on('input', match);

$('form').submit(()=>{
    if(flag1 && flag2){
        return true;
    }
    alert("please check the inputs correctly!!");
    return false;
});

$('#email-x').hide();
$('#email-tick').hide();
$('#password-tick').hide();
$('#password-x').hide();
console.log("js loaded");