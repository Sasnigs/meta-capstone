import validator from "validator";

function hasLetterOrDigit(str) {
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const isLetter = (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
    const isDigit = char >= "0" && char <= "9";
    if (isLetter || isDigit) return true;
  }
  return false;
}

export function validateAuthInput(email, username, password) {
  if (!validator.isEmail(email)) {
    return "Invalid email format.";
  }

  if (username.includes(" ") || password.includes(" ")) {
    return "Username and password must not contain spaces.";
  }

  if (username.length < 6 || username.length > 10) {
    return "Username must be between 6 and 10 characters.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (!hasLetterOrDigit(username)) {
    return "Username must include at least one letter or number.";
  }

  if (!hasLetterOrDigit(password)) {
    return "Password must include at least one letter or number.";
  }

  return null;
}
