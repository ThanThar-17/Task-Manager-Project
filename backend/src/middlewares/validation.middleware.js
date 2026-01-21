export const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    if (!regex.test(password)) {
      throw new Error(
        'Password must be at least 6 characters and include uppercase, lowercase, and special character'
      );
    }
  };
