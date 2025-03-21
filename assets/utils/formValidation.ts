 // Email validation function
 export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //password validation function
  export const validatePassword = (password: string) => {
    // Check if password meets requirements:
    // - At least 8 characters
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // - Contains at least one number
    // - Contains at least one special character

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  //validate a users age
  export const validateAge = (age: string) => {
    // Convert to number for comparison
    const numericAge = parseInt(age, 10);

    // Check if it's a valid number and in range 0-120
    if (isNaN(numericAge)) {
      return false;
    }

    // Check for leading zeros in multi-digit numbers
    if (age.length > 1 && age[0] === "0") {
      return false;
    }

    return numericAge > 0 && numericAge <= 120;
  };