
import { Types } from "mongoose";
import { CookieOptions } from "express";

import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";


import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { IUser } from "../types/interfaces";
import jwt from "jsonwebtoken";

const generateTokens = async(userId: Types.ObjectId) => {
  try{
    const user:any = await User.findById(userId);
    // console.log(user)
    
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({validateBeforeSave: true});
    return { accessToken, refreshToken };


  }catch(err){
    throw new ApiError(500, "Somthing went wrong while generating tokens",[err])
  }
}

// register user
const registerUser = asyncHandler(async(req, res) => {
  const {email, password, username } = req.body;
  
  const existedUser = await User.findOne({
    $or: [{username}, {email}],
  })

  if(existedUser) throw new ApiError(409, "User with email or username already exists", []);

  const user:IUser = await User.create({
    email,
    password,
    username,
    isVerified: false,
  })
  if(!(user._id instanceof Types.ObjectId)) throw new ApiError(500, "failed to save user info")

  const {accessToken, refreshToken} = await generateTokens(user._id);
  if(!accessToken || !refreshToken) throw new ApiError(500, "Faild to generate tokens");

  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  const options:CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none':'lax',
  }
  return res
  .status(201)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(201, {user: createdUser, accessToken, refreshToken}, "User registerd successfully", true)
  )
})

// login user
const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;

  const user:any = await User.findOne({email});
  if(!user) {
    throw new ApiError(404, "User not found", []);
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if(!isPasswordValid) {
    throw new ApiError(401, "Invalid password", []);
  }

  const {accessToken, refreshToken} = await generateTokens(user._id);

  const logedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options:CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none':'lax',
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {user: logedInUser, accessToken, refreshToken},
      "User loged in successfully",
      true
    )
  )
})

const getUser = asyncHandler(async(req, res) => {
  const {user} = req.body;
  const { accessToken, refreshToken } = await generateTokens(user._id);
  const refreshedUser = await User.findByIdAndUpdate(user._id, {refreshToken: refreshToken}).select("-password -refreshToken");
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {user: refreshedUser, accessToken, refreshToken},
      "User fetched successfully",
      true
    )
  )
})


const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if(!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request")
  }
  
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if(!refreshTokenSecret) {
    throw new ApiError(500, "Somthing went wrong accessing server secret")
  }
  const decodedToken:any = jwt.verify(
    incomingRefreshToken,
    refreshTokenSecret,
  )

  const user:any = await User.findById(decodedToken?._id)
  if(!user) {
    throw new ApiError(401, "Invalid refresh token")
  }

  // cheack if the refresh token has expired or used
  if(incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token has expired or used")
  }
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none':'lax',
  };

  const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user._id)

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", newRefreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        accessToken, refreshToken: newRefreshToken
      },
      "Access Token refreshed",
      true
    )
  )
})














export { registerUser, loginUser, getUser }