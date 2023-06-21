export const checkUsernameValid = (username) => {
  if (username.length < 4) {
    return "Username is too short!";
  } else if (username.length > 50) {
    return "Username is too long!";
  } else if (username.search(/[^a-zA-Z0-9]/) !== -1) {
    return "Please remove special character(s) and/or space(s) from your potential username!";
  }
  return "valid";
};

export const checkPwd = (password) => {
  const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (password.length < 6) {
    return "Password is too short!";
  } else if (password.length > 50) {
    return "Password is too long!";
  } else if (password.search(/\d/) === -1) {
    return "You need at least 1 number in your password!";
  } else if (password.search(/[a-zA-Z]/) === -1) {
    return "You need at least 1 letter in your password!";
  } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%]/) !== -1) {
    return "Invalid character in password";
  } else if (!specialChar.test(password)) {
    return "Please enter at least one special character in your password. (!, @, #, $, %)";
  }
  return "valid";
};
