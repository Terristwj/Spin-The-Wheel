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
    else
        // Checks to see if settings is opened
       isSettingsOpen();
}

// Open admin settings
function openSettings(){
    var isAdmin = document.getElementById("Toggle").checked;
    var toOpen = document.getElementById("AdminSettings").classList.contains('close-AdminSettings');
    // Open settings & increase width of invisible panel
    if (toOpen && isAdmin){
        document.getElementById("AdminSettings").classList.remove('close-AdminSettings');
        document.getElementById("AdminControls").classList.add("width330px");
        document.getElementById("AdminControls").classList.remove("width90px");
    }
    // Close settings & decrease width of invisible panel
    else{
        document.getElementById("AdminSettings").classList.add('close-AdminSettings');
        document.getElementById("AdminControls").classList.add("width90px");
        document.getElementById("AdminControls").classList.remove("width330px");
    }
}

// Force close admin settings(if opened)
function isSettingsOpen(){
    var toClose = !document.getElementById("AdminSettings").classList.contains('close-AdminSettings');
    if (toClose){
        document.getElementById("AdminSettings").classList.add('close-AdminSettings');
        // Changes theme after closing admin settings
        setTimeout(function() {
            document.getElementById("theme").href = "styles/userTheme.css";
        }, 750);
        // Decrease width of invisible panel
        document.getElementById("AdminControls").classList.add("width90px");
        document.getElementById("AdminControls").classList.remove("width330px");
    } 
    // Changes theme only
    else
        document.getElementById("theme").href = "styles/userTheme.css";
}