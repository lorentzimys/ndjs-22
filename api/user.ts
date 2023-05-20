import * as mockUser from "@root/api/__mocks__/user.json";
import { User } from "@root/models/User";

/**
 * Login user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const login = (req: any, res: any) => res.status(201).send(new User(mockUser as unknown as User));
