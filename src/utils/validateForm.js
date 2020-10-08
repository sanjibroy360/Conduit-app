export default function validateForm(values) {
  const errors = {};

  let isEmailValid = validateEmail(values.email);
  if (!values?.username) {
    errors.username = "Username is required.";
  }
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!isEmailValid) {
    errors.email = "Invalid Email.";
  }

  if (!values?.password) {
    errors.password = "Password is required";
  }
  if (values?.password.length < 8) {
    errors.password = "Password should be at-least 8 characters long";
  } else if (!passwordHasUpperCaseAndLowerCaseLetter(values.password)) {
    errors.password =
      "Password should contain atleast one uppercase and one lowercase letter";
  } else if (!passwordHasNumber(values.password)) {
    errors.password = "Password should contain atleast one number";
  } else if (!passwordHasSpecialCharacter(values.password)) {
    errors.password = "Password should contain atleast one special character";
  }

  return errors;
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function passwordHasUpperCaseAndLowerCaseLetter(password) {
  const regex = /(?=.*[a-z])(?=.*[A-Z])/;
  return regex.test(password);
}

function passwordHasNumber(password) {
  const regex = /(?=.*[0-9])/;
  return regex.test(password);
}

function passwordHasSpecialCharacter(password) {
  const regex = /\W|_/g;
  return regex.test(password);
}
