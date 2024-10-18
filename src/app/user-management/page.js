import AddNewUser from "@/components/add-new-user";
import { fetchUserActionData } from "../actions/page";
import SingleUserCard from "@/components/single-user-card";

async function UserManagement() {
  
  const getListOfUsers = await fetchUserActionData()
  console.log(getListOfUsers);
    


  return (
    <div className="max-w-6xl p-20">
      <div className="flex justify-between">
        <h1>User management</h1>
        <AddNewUser />
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3">
        {
          getListOfUsers && getListOfUsers.data && getListOfUsers.data.length > 0 ? getListOfUsers.data.map(userItem => <SingleUserCard key={userItem._id} user={userItem} /> )
          : <h3>No user found! Please create one</h3> } 
      </div>
    </div>
  );
}

export default UserManagement;
