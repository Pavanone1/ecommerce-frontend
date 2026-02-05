// Show logged-in user
function showUserInfo() {
  const userInfo = document.getElementById("userInfo");
  auth.onAuthStateChanged(user => {
    if (user) {
      userInfo.innerHTML = `Hello, ${user.displayName || user.email} <button id="logoutBtn">Logout</button>`;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        auth.signOut().then(() => location.href = "login.html");
      });
    } else {
      userInfo.innerHTML = "";
    }
  });
}
showUserInfo();

// Signup
document.getElementById("signupBtn")?.addEventListener("click", () => {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;
  const errorEl = document.getElementById("signupError");
  const successEl = document.getElementById("signupSuccess");
  errorEl.textContent = ""; successEl.textContent = "";

  if (!name || !email || !password || !confirmPassword) { errorEl.textContent = "All fields are required."; return; }
  if (password !== confirmPassword) { errorEl.textContent = "Passwords do not match."; return; }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      userCredential.user.updateProfile({ displayName: name });
      successEl.textContent = "Signup successful! Redirecting...";
      setTimeout(() => window.location.href = "login.html", 1500);
    })
    .catch(error => { errorEl.textContent = error.message; });
});

// Login
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");
  errorEl.textContent = "";
  if (!email || !password) { errorEl.textContent = "Both fields are required."; return; }

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      window.location.href = "index.html";
    })
    .catch(error => { errorEl.textContent = error.message; });
});

// Toggle links
document.getElementById("goSignup")?.addEventListener("click", () => window.location.href="signup.html");
document.getElementById("goLogin")?.addEventListener("click", () => window.location.href="login.html");
