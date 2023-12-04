// Function to extract parameters from the URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;

    console.log('Original URL:', url);

    name = name.replace(/[\[\]]/g, '\\$&');
    console.log('Formatted Name:', name);

    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) {
        console.log('No results found.');
        return null;
    }

    if (!results[2]) {
        console.log('No second group found.');
        return '';
    }

    console.log('Decoded Result:', decodeURIComponent(results[2].replace(/\+/g, ' ')));
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var scriptUrl = 'https://script.google.com/macros/s/AKfycbzcbJE7qHY7pEZC7P5VHqZsR1U5_Aw8gXcKfAZ-pQE/dev';

function loadDataFromGoogle() {
    // Extract the unique token from the URL
    var uniqueToken = getParameterByName("token");
    console.log("Unique Token from URL: " + uniqueToken);

    // Fetch data from Google Sheets using fetch
    if (!uniqueToken) {
        fetch(scriptUrl + '?action=getData')  
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log("Data received from server (GET):", data);
                    setFormValues(data);
                } else {
                    console.error("Error fetching data from the server (GET).");
                }
            })
            .catch(error => {
                console.error("Error fetching data from the server (GET):", error);
            });
    }

    // If there's a unique token, fetch data associated with it using fetch for POST request
    if (uniqueToken) {
        fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'getDataByToken',
                uniqueToken: uniqueToken,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log("Data received from server (POST):", data);
                setFormValues(data);
            } else {
                console.error("Error fetching data from the server (POST).");
            }
        })
        .catch(error => {
            console.error("Error fetching data from the server (POST):", error);
        });
    }
}

// Function to set form values based on received data
function setFormValues(data) {
    document.getElementById("name").value = data.name;
    document.getElementById("invitedBy").value = data.invitedBy;
    document.getElementById("seatsAllotted").value = data.seatsAllotted;
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

// Function to check if Google API is loaded and then load data
function checkAndLoadData() {
    if (typeof google !== 'undefined' && google.script) {
        console.log("Google API loaded. Loading data from Google Sheets...");
        loadDataFromGoogle();
    } else {
        console.error("Google API not loaded. Unable to load data.");
        setTimeout(checkAndLoadData, 100);
    }
}

// Load the Google API client on window load
window.onload = function () {
    // Load the Google API client first
    gapi.load('client', function () {
        initClient(); // Initialize the Google API client
        checkAndLoadData(); // Check and load data after client initialization
    });
};
