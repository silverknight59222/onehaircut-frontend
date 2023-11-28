import React, { useEffect, useState } from "react";
import BaseModal from "@/components/UI/BaseModal";
import Footer from "@/components/UI/Footer";
import { Theme_A } from "@/components/utilis/Themes";
import { user_api } from "@/api/clientSide";
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  permissions: any
}
interface Role {
  id: number;
  name: string;
  permissions: {
    edit: boolean;
    // Add other permissions here as needed
  };
}

const UsersPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [users, setUsers] = useState<User[]>([])
  const [userToDelete, setUserToDelete] = useState<{ name: string, id: number | null }>({ name: '', id: null, })
  const [userToEdit, setUserToEdit] = useState<{ phone: string, role: string, email: string, password: string, name: string, id: number | null }>({ phone: '', role: '', email: '', password: '', name: '', id: null, })

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(''); // Initialize password state

  // State for roles
  const initialRoles = [
    {
      id: 1,
      name: "Admin",
      permissions: {
        edit: true,
      },
    },
    {
      id: 2,
      name: "Staff",
      permissions: {
        edit: false,
      },
    },
  ];

  const [roles, setRoles] = useState(initialRoles); 
  const [newRoleName, setNewRoleName] = useState("");

  // State for the role edit modal
  const [isRoleModal, setIsRoleModal] = useState(false);
  const [editedRole, setEditedRole] = useState<Role | null>(null);

  const openUserModal = () => {
    setUserToEdit({ phone: '', role: '', email: '', password: '', name: '', id: null, });

    setIsModal(true);
  };

  const openRoleModal = () => {
    setIsRoleModal(true);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    await user_api.getUsers()
      .then((resp) => {
        if (resp.status === 200) {
          setUsers(resp.data.data);
        }
      })
      .catch(error => {
        //console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editUser = (user: any) => {
    setUserToEdit(user);
    setIsModal(true);
  };

  const saveUser = async (editedUser: any) => {
    // Make an API request to update the user
    // Then update the users state with the edited user
    // ...
    setIsLoading(true);
    const userWithPassword = {
      ...editedUser,
      password: password, // password is set in the component state
    };
    await user_api.saveUsers(userWithPassword)
      .then((resp) => {
        if (resp.status === 200) {
          fetchUsers();
          setIsModal(false);
        }
      })
      .catch(error => {
        //console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteUser = async (user: any) => {
    setUserToDelete(user);
    setIsDeleteModal(true);
    setIsLoading(true);

  };

  const confirmDeleteUser = async () => {
    // Make an API request to delete the user
    // Then update the users state by filtering out the deleted user
    // ...


    setIsDeleteModal(false);
    await user_api.deleteUser({ id: userToDelete.id })
      .then((resp) => {
        if (resp.status === 200) {
          fetchUsers();
          setIsDeleteModal(false);
        }
      })
      .catch(error => {
        //console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



  // Function to save role changes
  const saveRoleChanges = () => {
    if (editedRole) {
      // Make an API request to update the role
      // You can send `editedRole` to update the role's permissions
      // ...

      setIsRoleModal(false); // Close the modal after saving
    }
  };

  // Function to toggle permission switches
  const togglePermission = (permission: string) => {
    if (editedRole) {
      const updatedRole = {
        ...editedRole,
        permissions: {
          ...editedRole.permissions,
          [permission]: editedRole.permissions && editedRole.permissions[permission] ? true : false,
        },
      };
      setEditedRole(updatedRole);
    }
  };
  const openRoleEditModal = async (role: Role) => {
    try {
      const resp = await user_api.getPermission(role.name.toLowerCase());
      if (resp.status === 200) {
        setEditedRole({
          ...role,
          permissions: resp.data.data, // Assuming resp.data contains the permissions
        });
        setIsRoleModal(true);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-7 mb-10 mt-20">
          <button className={`${Theme_A.button.bigGradientButton}`}>
            Users
          </button>
          <button className={`${Theme_A.button.bigWhiteColoredButton}`}>
            Roles
          </button>
        </div>
      </div>
      <div className="flex items-center gap-14">
        <div className="w-full lg:w-6/12 border border-[#CACACA] rounded-3xl py-6 px-8 lg:px-12">
          <p className="font-semibold text-black text-[22px] lg:text-[27px]">
            Users list
          </p>
          <button onClick={openUserModal}>Add User</button>

          <table className="w-full text-sm text-left">
            <thead className="text-grey text-sm font-semibold mb-9">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-black font-semibold border-b-2 border-[#F4F4F6] pb-2">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role ? user.role : 'staff'}</td>
                  <td>
                    <button onClick={() => editUser(user)}>Edit</button> &nbsp; | &nbsp;
                    <button onClick={() => deleteUser(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full lg:w-6/12">
          <p>Roles list</p>
          {/* <button onClick={openRoleModal}>Add Role</button> */}
          <ul>
            {roles.map((role, index) => (
              <li key={index}>
                {role.name}
                <button onClick={() => openRoleEditModal(role)}>Edit Permissions</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isRoleModal && editedRole && (
        <BaseModal close={() => setIsRoleModal(false)}>
          <div>
            <p>Edit Permissions for {editedRole.name}</p>
            {Object.keys(editedRole.permissions).map((permission) => (
              <label key={permission}>
                <input
                  type="checkbox"
                  checked={editedRole.permissions[permission]}
                  onChange={() => togglePermission(permission)}
                />
                {permission}
              </label>
            ))}
            <button onClick={saveRoleChanges}>Save Changes</button>
          </div>
        </BaseModal>
      )}

      {isDeleteModal && userToDelete && (
        <BaseModal close={() => setIsDeleteModal(false)}>
          <div>
            <p>Confirm User Deletion</p>
            <p>Are you sure you want to delete {userToDelete.name}?</p>
            <button onClick={confirmDeleteUser}>Confirm</button>
            <button onClick={() => setIsDeleteModal(false)}>Cancel</button>
          </div>
        </BaseModal>
      )}

      {isModal && (
        <BaseModal close={() => setIsModal(false)}>
          <div>
            <p>{userToEdit.id ? "Edit User" : "Add User"}</p>
            <input
              type="text"
              placeholder="Name"
              value={userToEdit.name}
              onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email"
              value={userToEdit.email}
              onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={userToEdit.phone}
              onChange={(e) => setUserToEdit({ ...userToEdit, phone: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={password} // Set the value from the component state
              onChange={(e) => setPassword(e.target.value)} // Update the password state
            />
            <input
              type="radio"
              value='admin'
              name="role"
              onChange={(e) => setUserToEdit({ ...userToEdit, role: e.target.value })}
              checked={userToEdit.role === "admin"} // Check if the user's role is "admin"

            />Admin
            <input
              type="radio"
              value='staff'
              name="role"
              onChange={(e) => setUserToEdit({ ...userToEdit, role: e.target.value })}
              checked={userToEdit.role === "staff"} // Check if the user's role is "staff"

            />Staff
            <br></br>
            <button onClick={() => saveUser(userToEdit)}>
              {userToEdit.id ? "Save Changes" : "Add User"}
            </button>
          </div>
        </BaseModal>
      )}

      <Footer />
    </div>
  );
};

export default UsersPage;
