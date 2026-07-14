const validateRegisterInput = ({ name, email, password }) => {
  const errors = {};

  // Name Validation
  if (!name || name.trim() === "") {
    errors.name = "Name is required.";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long.";
  }

  // Email Validation
  if (!email || email.trim() === "") {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // Password Validation
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateRegisterInput;