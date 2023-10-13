
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
        $result.text(email + ' is valid.');
        $result.css('color', 'green');
    } else{
        $result.text(email + ' is invalid.');
        $result.css('color', 'red');
    }
    return false;
    }

$('#input-email').on('input', validate);


const match = () => {
    const first = $('#input-password').val();
    const second = $('#input-confirm-password').val();
    const $matchResult = $('#matched-result');
    $matchResult.text('');
    if(first == second){
        $matchResult.text('password matched');
        $matchResult.css('color','green');
        console.log("values matched");
    }
    else{
        console.log("values mismatch");
        second.css('color','red');
    }

}

$('#input-confirm-password').on('input', match);