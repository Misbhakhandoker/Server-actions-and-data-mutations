"use client";

import { addNewUserAction, editUserAction } from "@/app/actions/page";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserContext } from "@/context";
import { addNewUserFormControls, addNewUserFormInitialState } from "@/utils";
import { useContext } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const formControls = [];
function AddNewUser() {
  const {
    openPopup,
    setOpenPopup,
    addNewUserFormData,
    setAddNewUserFormData,
    currentUserID,
    setCurrentUserID,
  } = useContext(UserContext);
  console.log(currentUserID);

  function handleSaveButtonValid() {
    return Object.keys(addNewUserFormData).every(
      (key) => addNewUserFormData[key].trim() !== ""
    );
  }
  async function handleAddNewUserAction() {
    const result = currentUserID !== null ? await editUserAction(currentUserID, addNewUserFormData, "/user-management") : await addNewUserAction(
      addNewUserFormData,
      "/user-management"
    );
    setOpenPopup(false);
    setAddNewUserFormData(addNewUserFormInitialState);
    setCurrentUserID(null)
  }
  return (
    <div>
      <Button onClick={() => setOpenPopup(true)}>AddNewUser</Button>
      <Dialog
        open={openPopup}
        onOpenChange={() => {
          setOpenPopup(false);
          setAddNewUserFormData(addNewUserFormInitialState);
          setCurrentUserID(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentUserID !== null ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <form action={handleAddNewUserAction} className="grid gap-4 py-4 ">
            {addNewUserFormControls.map((controlItem) => (
              <div className="mb-5" key={controlItem.name}>
                <Label htmlFor={controlItem.label} className="text-right">
                  {controlItem.name}
                </Label>
                <Input
                  id={controlItem.name}
                  name={controlItem.name}
                  placeholder={controlItem.placeholder}
                  type={controlItem.type}
                  value={addNewUserFormData[controlItem?.name]}
                  onChange={(event) =>
                    setAddNewUserFormData({
                      ...addNewUserFormData,
                      [controlItem.name]: event.target.value,
                    })
                  }
                />
              </div>
            ))}
            <DialogFooter>
              <Button
                className="w-full disabled:opacity-55"
                disabled={!handleSaveButtonValid()}
                type="submit"
              >
                {currentUserID !== null ? "Edit User" : "Add New User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewUser;
