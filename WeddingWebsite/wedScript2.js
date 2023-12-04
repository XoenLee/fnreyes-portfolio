import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
databaseURL: "https://wedding-seat-management-default-rtdb.asia-southeast1.firebasedatabase.app/",};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);