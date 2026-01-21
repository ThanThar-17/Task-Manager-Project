import {
    signupUser,
    loginUser,
    fetchUsers
  } from "../services/auth.service.js";

  export const signup = async (req, res) => {
    try {
      const user = await signupUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  export const login = async (req, res) => {
    try {
      const user = await loginUser(
        req.body.email,
        req.body.password
      );
      res.json(user);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };
  export const getUsers = async (req, res) => {
    try {
      const users = await fetchUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };