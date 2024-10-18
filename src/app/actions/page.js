"use server";

import connectToDB from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import zod from "zod";


// add new user action
export async function addNewUserAction(formData, pathToRevalidate) {
  await connectToDB();
  try {
    // validate data using zod

    const newlyCreatedUser = await User.create(formData);
    if (newlyCreatedUser) {
        revalidatePath(pathToRevalidate)  // for fetch data add new show
      return {
        success: true,
        message: "User added successfully",
      };
    } else {
      return {
        success: false,
        message: "Some error occurred! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occurred! Please try again",
    };
  }
}

// fetch users actions

export async function fetchUserActionData(){
    await connectToDB()
    try {
        const listOfUsers = await User.find({})
        if(listOfUsers){
            return {
                success: true,
                data: JSON.parse(JSON.stringify(listOfUsers))
            }
        } else{
            return {
                success: false,
                message: "No user found! Please add a new user"
            }
        }
        
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Some error occurred! Please try again",
        };
        
    }
}

// edit user action

export async function editUserAction(currentUserID, formData, pathToRevalidate){
    await connectToDB()
    try {
        const {firstName, lastName, email, address} = formData
        const updatedUser = await User.findByIdAndUpdate({_id:currentUserID}, {
            firstName, lastName, email, address            
        },{new: true})
        if(updatedUser){
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: "User updated successfully"
            }
        }else{
            return {
                success: false,
                message: "Not able update user! Please try again later"
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Some error occurred! Please try again",
        }
    }
}

// delete user action

export async function deleteUserAction(currentUserID, pathToRevalidate){
    await connectToDB()
    try {
        const deleteUser = await User.findByIdAndDelete(currentUserID)
        if(deleteUser){
            revalidatePath(pathToRevalidate)
            return{
                success: true,
                message: "User deleted successfully"
            }
        } else{
            return {
                success: false,
                message: "Not able perform delete operation! Please try again later"
            }
        }
        
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Some error occurred! Please try again",
        };
        
    }
}