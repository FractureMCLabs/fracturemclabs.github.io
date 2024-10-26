import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { 
    useGetUsersQuery, 
    useDeleteUserMutation, 
    useGetUserDetailsQuery, 
    useUpdateUserMutation 
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message";
import { useSelector, useDispatch } from "react-redux";

const UserList = () => {

    const {userInfo} = useSelector(state => state.auth)
  
    const {data: users, refetch, isLoading, error} = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState("")
    const [editableUserEmail, setEditableUserEmail] = useState("")

    useEffect(() => {

        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {

        if (window.confirm("Are you sure?")) {

            try {
                await deleteUser(id)
                toast.success("User deleted successfully");
                refetch();
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableUserName(username);
        setEditableUserEmail(email);
      };
    
      const updateHandler = async (id) => {

        if (userInfo._id != id) {

            try {
                await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail,
                });
                setEditableUserId(null);
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            toast.error("You can't edit your owndata from here! Please edit them from your profile page");
        }
            
      };
  
    return (
        <div className='relative h-screen w-screen overflow-hidden' style={{background: "url(" + "https://media.istockphoto.com/id/1038727610/cs/fotografie/tekut%C3%A9-tvary-abstraktn%C3%AD-holografick%C3%A9-3d-vlnit%C3%A9-pozad%C3%AD.webp?s=2048x2048&w=is&k=20&c=Z3sNKJsAlcJ9G3ac6RuXCdfZjY405ff7DGHFZ5Otifs=" + ")", backgroundSize: "100% 100%"}}>
            {isLoading ? (
                <Loader />
            ) : (
                error ? (
                    <Message variant="danger">
                        {error?.data.message || error.message}
                    </Message>
                ) : (
                    <div>
                    <h1 className="text-3xl font-semibold mb-4 text-white w-full text-center pt-8">Users</h1>
                    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
                        
                        <table className="w-full md:w-4/5 mx-auto bg-black bg-opacity-30 p-8 rounded-lg shadow-lg w-[40rem] backdrop-blur-[10px]">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-white">ID</th>
                                    <th className="px-4 py-2 text-left text-white">Username</th>
                                    <th className="px-4 py-2 text-left text-white">Email</th>
                                    <th className="px-4 py-2 text-left text-white text-center">Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (

                                    <tr key={user._id}>
                                        <td className="px-4 py-2 text-white">{user._id}</td>
                                        <td className="px-4 py-2">
                                            {editableUserId == user._id ? (
                                                <div className="flex items-center">
                                                    <input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} className="mt-1 p-2 rounded w-full bg-black backdrop-blur-[10px] bg-opacity-30 text-white"/>
                                                    <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                        <FaCheck />
                                                    </button>
                                                </div>
                                            ) : (
                                                
                                                <div className="flex items-center">
                                                    <p className="text-white">{user.username}</p>
                                                    {!user.isAdmin && (
                                                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                            <FaEdit className="ml-[1rem] text-white" />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {editableUserId == user._id ? (
                                                <div className="flex items-center">
                                                    <input type="text" value={editableUserEmail} onChange={e => 
                                                        setEditableUserEmail(e.target.value)} className="mt-1 p-2 rounded w-full bg-black backdrop-blur-[10px] bg-opacity-30 text-white" />
                                                        <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                            <FaCheck />
                                                        </button>
                                                </div>
                                            ) : (
                                                
                                                <div className="flex items-center">
                                                    <p className="text-white">{user.email}</p>
                                                    {!user.isAdmin && (
                                                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                            <FaEdit className="ml-[1rem] text-white" />
                                                        </button>
                                                    )}
                                                    
                                                </div>
                                            )}
                                        </td>
                                        <td className="flex px-4 py-4 justify-center">
                                            {user.isAdmin ? (
                                                <FaCheck style={{ color: "green" }} />
                                            ) : (
                                                <FaTimes style={{ color: "red" }} />
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {!user.isAdmin && (
                                                <div className="flex">
                                                    <button onClick={() => deleteHandler(user._id)} className="bg-black hover:bg-red text-white font-bold py-2 px-4 rounded">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                )
            )}
        </div>
    )
}

export default UserList