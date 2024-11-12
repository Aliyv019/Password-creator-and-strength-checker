import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputPassword, setInputPassword] = useState('');
  const [strength, setStrength] = useState('');

  const generatePassword = (length = 12) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allCharacters = lowercase + uppercase + digits + symbols;

    let newPassword = '';
    newPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    newPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    newPassword += digits[Math.floor(Math.random() * digits.length)];
    newPassword += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      newPassword += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');
    setInputPassword(newPassword); // Set the generated password to input
    checkPasswordStrength(newPassword); // Check strength of the generated password
  };

  const checkPasswordStrength = (password) => {
    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    const strengthScore = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;

    if (strengthScore === 4 && length >= 12) {
      setStrength('Very Strong');
    } else if (strengthScore === 4) {
      setStrength('Strong');
    } else if (strengthScore === 3) {
      setStrength('Moderate');
    } else if (strengthScore === 2) {
      setStrength('Weak');
    } else {
      setStrength('Very Weak');
    }
  };

  const handleInputChange = (e) => {
    const password = e.target.value;
    setInputPassword(password);
    checkPasswordStrength(password);
  };

  return (
    <div className="App">
      <h1>Password Generator and Strength Checker</h1>
      <button onClick={() => generatePassword(12)}>Generate Password</button>
      <div>
        <h2>Enter or Edit Your Password:</h2>
        <input
          type="text"
          value={inputPassword}
          onChange={handleInputChange}
          placeholder="Your password here"
        />
        {inputPassword && (
          <h3>Password Strength: {strength}</h3>
        )}
      </div>
    </div>
  );
};

export default App;