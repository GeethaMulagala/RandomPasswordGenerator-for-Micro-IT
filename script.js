function generatePassword() {
  const length = document.getElementById('length').value;
  const hasUpper = document.getElementById('uppercase').checked;
  const hasLower = document.getElementById('lowercase').checked;
  const hasNumber = document.getElementById('numbers').checked;
  const hasSymbol = document.getElementById('symbols').checked;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";

  let chars = "";
  if (hasUpper) chars += upperChars;
  if (hasLower) chars += lowerChars;
  if (hasNumber) chars += numbers;
  if (hasSymbol) chars += symbols;

  if (chars === "") {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * chars.length);
    password += chars[rand];
  }

  document.getElementById('result').value = password;
  evaluateStrength(password);
}

function copyPassword() {
  const result = document.getElementById('result');

  if (result.value) {
    result.select();
    result.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand('copy');

    alert('Password copied!');
  } else {
    alert('No password to copy!');
  }
}

function evaluateStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const strengthValue = document.getElementById("strengthValue");

  if (strength <= 2) {
    strengthValue.textContent = "Weak";
    strengthValue.style.color = "red";
  } else if (strength === 3 || strength === 4) {
    strengthValue.textContent = "Medium";
    strengthValue.style.color = "orange";
  } else {
    strengthValue.textContent = "Strong";
    strengthValue.style.color = "green";
  }
}