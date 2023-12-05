
var firebaseConfig = {
  apiKey: "AIzaSyDA1iE622RXv-Wpd4WoigN_dIvOb6aELug",
  authDomain: "wedding-seat-management.firebaseapp.com",
  databaseURL: "https://wedding-seat-management-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding-seat-management",
  storageBucket: "wedding-seat-management.appspot.com",
  messagingSenderId: "17993585526",
  appId: "1:17993585526:web:0de7623e7f5ef69b862057",
  measurementId: "G-1WSNVXHHL6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userId = window.location.search.split('=')[1]; // assuming the URL is of the form ?userId=uniqueKey
var database = firebase.database();
database.ref('/users/' + userId).once('value').then(function(snapshot) {
    if (snapshot.exists()) {
        var name = snapshot.val().name;
        var invitedBy = snapshot.val().invitedBy;
        var seatsAlloted = snapshot.val().seatsAlloted;

        document.getElementById('name').value = name;
        document.getElementById('invitedBy').value = invitedBy;
        document.getElementById('seatsAlloted').value = seatsAlloted;
    } else {
        console.log('No data available for this user.');
    }
}).catch(function(error) {
    console.error(error);
});

var seatsConfirmedInput = document.getElementById('seatsConfirmed');
var seatsAllotedInput = document.getElementById('seatsAlloted');

seatsConfirmedInput.addEventListener('input', function(e) {
    var confirmedSeats = parseInt(seatsConfirmedInput.value);
    var seatsAlloted = parseInt(seatsAllotedInput.value);

    if (confirmedSeats < 1) {
        seatsConfirmedInput.value = 1;
    } else if (confirmedSeats > seatsAlloted) {
        seatsConfirmedInput.value = seatsAlloted;
    }
});

// Event listener for the 'attendingOrNot' field
document.getElementById('attendingOrNot').addEventListener('change', function(e) {
  var attending = e.target.value;
  var seatsAlloted = document.getElementById('cont-seatsAlloted');
  var invitedBy = document.getElementById('cont-invitedBy');
  var seatsConfirmed = document.getElementById('cont-seatsConfirmed');



  if (attending === 'yes') {
      seatsAlloted.style.display = 'block';
      invitedBy.style.display = 'block';
      seatsConfirmed.style.display = 'block';
  } else {
      seatsAlloted.style.display = 'none';
      invitedBy.style.display = 'none';
      seatsConfirmed.style.display = 'none';
  }
});

// Event listener for the form submission
document.getElementById('seatForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var userId = window.location.search.split('=')[1];
  var name = document.getElementById('name').value;
  var invitedBy = document.getElementById('invitedBy').value;
  var seatsAlloted = document.getElementById('seatsAlloted').value;
  var confirmedSeats = document.getElementById('seatsConfirmed').value;
  var attending = document.getElementById('attendingOrNot').value;

  if (!userId || !name || !invitedBy || !seatsAlloted || (attending === 'yes' && !confirmedSeats)) {
    alert('Please make sure there is a valid user and fill in all the required fields.');
    return;
  }
  // Set confirmedSeats to 0 if attending is 'no'
  if (attending === 'no') {
    confirmedSeats = 0;
  }

  database.ref('/users/' + userId).update({
      name: name,
      invitedBy: invitedBy,
      seatsAlloted: seatsAlloted,
      seatsConfirmed: confirmedSeats,
      attendingOrNot: attending
  });
});



