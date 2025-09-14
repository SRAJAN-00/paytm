import { useEffect, useState } from "react";

import { BACKEND_URL } from "../../config";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router-dom";

type User = {
  _id?: string;
  id?: string;
  firstName?: string;
  avatar?: string;
};

export const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/user/all`);
        const data = await response.json();
        setUsers(data.users);
        console.log("Fetched users:", data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <UserCard
            key={user._id || user.id || user.firstName}
            userName={user.firstName || ""}
            userAvatar={user.avatar}
            onPayNow={() =>
              navigate("/send?id=" + user.id + "&name=" + user.firstName)
            }
          />
        ))}
      </div>
    </>
  );
};
