console.log("✅ script.js yüklendi!");
function signupHandler() {
  const email = document.getElementById('email').value.trim();
  const pass  = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(cred => console.log('Kayıt başarılı, UID =', cred.user.uid))
    .catch(err => console.error('Kayıt hatası:', err.message));
}
function loginHandler() {
  const email = document.getElementById('email').value.trim();
  const pass  = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(cred => console.log('Giriş başarılı, UID =', cred.user.uid))
    .catch(err => console.error('Giriş hatası:', err.message));
}
firebase.auth().onAuthStateChanged(user => {
  const authSection = document.getElementById('authSection');
  if (user) {
    authSection.innerHTML = `
      <span>Hoşgeldin ${user.email.split('@')[0]}</span>
      <button id="btnLogout">Çıkış Yap</button>
    `;
    document.getElementById('btnLogout').onclick = () => firebase.auth().signOut();
    loadCalendar(user.uid);
    loadFoods(user.uid);
  } else {
    authSection.innerHTML = `
      <input id="email" type="email" placeholder="E‑posta">
      <input id="password" type="password" placeholder="Şifre">
      <button id="btnSignup">Kayıt Ol</button>
      <button id="btnLogin">Giriş Yap</button>
    `;
    document.getElementById('btnSignup').onclick = signupHandler;
    document.getElementById('btnLogin').onclick  = loginHandler;
  }
});
// Calendar ve chart kodları...
// (Buraya daha önceki kod bloğunuzu ekleyin; uzun olduğu için kısalttım.)
