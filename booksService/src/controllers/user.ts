import { UserModel } from "@root/models/User";

/*** Returns 404 error */
const getNotFoundError = (res: any) => res.status(404).json({
  errmsg: "User not found",
  errcode: 404,
});


/** Login user */
export const login = async (req: any, res: any) => {
  const { password, email } = req.body;

  try {
    const user = await UserModel.findOne({ email }).exec();
    
    console.log(user);

    if (!user) {
      return getNotFoundError(res);
    }
  
    res.status(201).send(user);
  } catch (e) {
    console.log(e);
  }
};


/** Signup user */
export const signup = async (req: any, res: any) => {
  const { name, password, email } = req.body;

  try {
    const newUser = await new UserModel({ name, password, email });
    const createdUser = await newUser.save();

    console.log(createdUser);
  
    res.status(201).send(createdUser);

  } catch (e) {
    console.log(e);
  }
};

const userController = {
  login, signup 
};

export default userController;
