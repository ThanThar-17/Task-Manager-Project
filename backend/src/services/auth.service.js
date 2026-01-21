import {
    createUser,
    findUserByEmail,
    getAllUsers
  } from "../repositories/user.repository.js";

  import { validatePassword } from "../middlewares/validation.middleware.js";

  export const signupUser = async (data) => {
    const { email, password } = data;

    validatePassword(password);

    const exists = await findUserByEmail(email);
    if (exists) {
      throw new Error("Email already exists");
    }

    return createUser(data);
  };

  export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    return user;
  };
  export const fetchUsers = async () => {
    return getAllUsers();
  };