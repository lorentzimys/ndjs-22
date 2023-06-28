import { UserModel } from "@root/models/User";
import { RequestHandler } from "express";

/** Signup user */
export const signup: RequestHandler = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const newUser = await new UserModel({ name, password, email });
    const createdUser = await newUser.save();

    console.log(createdUser);
  
    res.status(201).send(createdUser);
  } catch (e) {
    return res.status(409).json({ 
      errcode: 409,
      errmsg: "User already exists",
    });
  }
};

const userController = {
  signup,
};

export default userController;
