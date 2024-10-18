"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserAction } from "@/app/actions/page";
import { useContext } from "react";
import { UserContext } from "@/context";



function SingleUserCard({ user }) {
const {setOpenPopup, setCurrentUserID , setAddNewUserFormData} = useContext(UserContext)

async function handleDelete(getCurrentUserID){
    await deleteUserAction(getCurrentUserID, "/user-management")
}

async function handleEdit(getCurrentUser){
    setOpenPopup(true)
    setCurrentUserID(getCurrentUser._id)
    setAddNewUserFormData({
        firstName: getCurrentUser?.firstName,
        lastName: getCurrentUser?.lastName,
        email: getCurrentUser?.email,
        address: getCurrentUser?.address
    })
}


    return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <CardDescription className="text-sm">{user?.email}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>{user?.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEdit(user) } >Edit</Button>
        <Button onClick={() => handleDelete(user?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default SingleUserCard;
