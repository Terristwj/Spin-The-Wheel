// On load
function bodyLoad(){
    changeTheme();
}

// Toggle theme
function changeView(){
    changeTheme();
}

// Change themes
function changeTheme(){
    var isAdmin = document.getElementById("Toggle").checked;
    // Change to Admin
    if (isAdmin)
        document.getElementById("theme").href = theme_href = "styles/adminTheme.css";
    // Change to User
    else{
        // Checks to see if settings is opened
       isSettingsOpen();
    }
}

// Open admin settings
function openSettings(){
    var isAdmin = document.getElementById("Toggle").checked;
    var closed = document.getElementById("AdminSettings").classList.contains('close-AdminSettings');
    // Open settings
    if (closed && isAdmin)
        document.getElementById("AdminSettings").classList.remove('close-AdminSettings');
    // Close settings
    else
        document.getElementById("AdminSettings").classList.add('close-AdminSettings');
}

// Force close admin settings(if opened)
function isSettingsOpen(){
    var opened = !document.getElementById("AdminSettings").classList.contains('close-AdminSettings');
    if (opened){
        document.getElementById("AdminSettings").classList.add('close-AdminSettings');
        // Changes theme after closing admin settings
        setTimeout(function() {
            document.getElementById("theme").href = "styles/userTheme.css";
        }, 750);
    } 
    // Changes
    else
        document.getElementById("theme").href = "styles/userTheme.css";
}