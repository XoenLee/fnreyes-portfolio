// Form Script 

// Function to extract parameters from the URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function loadDataFromGoogle() {
    // Extract the unique token from the URL
    var uniqueToken = getParameterByName("token");
    console.log("Unique Token from URL: " + uniqueToken);

    // Fetch data from Google Sheets and fill form fields
    if (!uniqueToken) {
        google.script.run.withSuccessHandler(function (data) {
            if (data) {
                console.log("Data received from server:", data);
                document.getElementById("name").value = data.name;
                document.getElementById("invitedBy").value = data.invitedBy;
                document.getElementById("seatsAllotted").value = data.seatsAllotted;
            } else {
                console.error("Error fetching data from the server.");
            }
        }).withFailureHandler(function (error) {
            console.error("Error fetching data from the server:", error);
        }).getData();
    }

    // If there's a unique token, fetch data associated with it
    if (uniqueToken) {
        google.script.run.withSuccessHandler(function (data) {
            if (data) {
                console.log("Data received from server:", data);
                document.getElementById("name").value = data.name;
                document.getElementById("invitedBy").value = data.invitedBy;
                document.getElementById("seatsAllotted").value = data.seatsAllotted;
            } else {
                console.error("Error fetching data from the server.");
            }
        }).withFailureHandler(function (error) {
            console.error("Error fetching data from the server:", error);
        }).getDataByToken(uniqueToken); // Pass uniqueToken directly
    }
}

function validateSeatsConfirmed() {
    var seatsConfirmed = parseInt(document.getElementById("seatsConfirmed").value, 10);
    var seatsAllotted = parseInt(document.getElementById("seatsAllotted").value, 10);

    if (isNaN(seatsConfirmed)) {
        alert("Please enter a valid number for confirmed seats.");
        document.getElementById("seatsConfirmed").value = "";
    } else if (seatsConfirmed > seatsAllotted) {
        alert("Seats confirmed cannot exceed seats allotted!");
        document.getElementById("seatsConfirmed").value = seatsAllotted.toString();
    }
}

// Check if google is defined, then load data
// function checkAndLoadData() {
//     if (typeof google !== 'undefined' && google.script) {
//         console.log("Google API loaded. Loading data from Google Sheets...");
//         loadDataFromGoogle();
//     } else {
//         console.error("Google API not loaded. Unable to load data.");
//         setTimeout(checkAndLoadData, 100);
//     }
// }

// Start checking and loading data
checkAndLoadData();