function checkPasswordStrength() {
    const password = document.getElementById('passwordInput').value;
    const strengthText = document.getElementById('passwordStrength');
    let strength = 0;

    if (password.length >= 8) strength += 1;  // Length criterion
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase letter
    if (/[a-z]/.test(password)) strength += 1; // Lowercase letter
    if (/[0-9]/.test(password)) strength += 1; // Digit
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Special character

    switch (strength) {
        case 0:
            strengthText.innerHTML = "Password strength: Very Weak";
            strengthText.style.color = "red";
            break;
        case 1:
            strengthText.innerHTML = "Password strength: Weak";
            strengthText.style.color = "red";
            break;
        case 2:
            strengthText.innerHTML = "Password strength: Medium";
            strengthText.style.color = "orange";
            break;
        case 3:
            strengthText.innerHTML = "Password strength: Good";
            strengthText.style.color = "yellowgreen";
            break;
        case 4:
            strengthText.innerHTML = "Password strength: Strong";
            strengthText.style.color = "green";
            break;
        case 5:
            strengthText.innerHTML = "Password strength: Very Strong";
            strengthText.style.color = "darkgreen";
            break;
        default:
            strengthText.innerHTML = "Enter a password to check its strength";
            strengthText.style.color = "black";
    }
}
