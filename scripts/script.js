// On load
function bodyLoad(){
    console.log(1);
    changeTheme();
    console.log(1);
}

// Toggle theme
function changeView(){
    changeTheme();
}

// Change themes
function changeTheme(){
    var currentStatus = document.getElementById("Toggle").checked;
    // Change to Admin
    if (currentStatus){
        document.getElementById("theme").href = theme_href = "styles/adminTheme.css";
        console.log(theme_href);
    } 
    // Change to User
    else {
        document.getElementById("theme").href = "styles/userTheme.css";
    }
}