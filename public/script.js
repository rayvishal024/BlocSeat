const API = window.location.origin + "/api";

// UI NAVIGATION
function showRegister() {
     document.getElementById("loginForm").classList.add("hidden");
     document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
     document.getElementById("registerForm").classList.add("hidden");
     document.getElementById("loginForm").classList.remove("hidden");
}

function showApp() {
     document.getElementById("authContainer").classList.add("hidden");
     document.getElementById("app").classList.remove("hidden");
     loadSeats();
}

// AUTH LOGIC
async function login() {
     const email = document.getElementById("loginEmail").value;
     const password = document.getElementById("loginPassword").value;

     const res = await fetch(`${API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
     });

     const data = await res.json();
     if (data.token) {
          localStorage.setItem("token", data.token);
          showApp();
     } else {
          alert(data.error || "Login failed");
     }
}

async function register() {
     const name = document.getElementById("regName").value;
     const email = document.getElementById("regEmail").value;
     const password = document.getElementById("regPassword").value;

     const res = await fetch(`${API}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
     });

     const data = await res.json();
     if (data.error) alert(data.error);
     else {
          alert("Account Created! Please Login.");
          showLogin();
     }
}

// SEAT LOGIC
async function loadSeats() {
     const res = await fetch(`${API}/seats`);
     const seats = await res.json();
     const container = document.getElementById("seats");
     container.innerHTML = "";

     let availableCount = 0;

     seats.sort((a, b) => a.id - b.id).forEach(seat => {
          const div = document.createElement("div");

          if (seat.isbooked) {
               div.className = "seat-card seat-booked";
               div.innerHTML = `
                <span class="text-xl font-black">#${seat.id}</span>
                <span class="booked-name">${seat.name || 'Reserved'}</span>
            `;
          } else {
               availableCount++;
               div.className = "seat-card seat-available";
               div.innerHTML = `
                <span class="text-xl font-black">#${seat.id}</span>
                <span class="text-[9px] font-bold uppercase tracking-widest opacity-80 mt-1">Available</span>
            `;
               div.onclick = () => bookSeat(seat.id);
          }

          container.appendChild(div);
     });

     document.getElementById("count").innerText = availableCount;
}

async function bookSeat(id) {
     const token = localStorage.getItem("token");
     if (!token) return showLogin();

     const res = await fetch(`${API}/seats/book/${id}`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}` }
     });

     const data = await res.json();
     if (data.error) alert(data.error);
     else loadSeats();
}

function logout() {
     localStorage.removeItem("token");
     location.reload();
}

// AUTO LOGIN CHECK
if (localStorage.getItem("token")) {
     showApp();
}