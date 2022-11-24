import UserModel from '@backend/models/user.model';
import db from '@backend/server';
import { NewUser, User } from 'types/User';
import jwt_decode from 'jwt-decode';

export type JWT_Decode = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export const decodeToken = async (token: string) => {
  const decoded: JWT_Decode = await jwt_decode(token);
  const user = {
    name: decoded.name,
    email: decoded.email,
    password: decoded.password,
  };

  return user;
};

export const createUser = async (body: NewUser) => {
  await db();
  return await UserModel.create(body);
};

export const getUsers = async () => {
  await db();
  return await UserModel.find();
};

export const getUserById = async (id: User['_id']) => {
  await db();
  return await UserModel.findById(id);
};

export const getUserByEmail = async (email: string) => {
  await db();
  return await UserModel.findOne({ email });
};
