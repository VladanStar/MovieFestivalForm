function check(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username != "vladan" || password != "12345"){
        return false;
    }
    else {
        return true;
    }
}
