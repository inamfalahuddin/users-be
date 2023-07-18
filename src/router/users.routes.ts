import { Router } from "express";
import { AddUser, GetUsers, Login } from "../controllers/users.controller";
import { auth } from "../middleware/authentication";

export default (router: Router) => {
  router.get("/me", auth, GetUsers);
  router.post("/register", AddUser);
  router.post("/login", Login);
};
