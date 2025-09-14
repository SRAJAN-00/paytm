import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { InputField } from "./InputField";
import axios from "axios";

type User = {
  _id?: string;
  id?: string;
  firstName?: string;
  avatar?: string;
};

const UserCard = ({
  userName,
  userAvatar,
  onPayNow,
}: {
  userName: string;
  userAvatar?: string;
  onPayNow: () => void;
}) => (
  <div className="flex items-center bg-white rounded-xl shadow p-4 gap-4">
    <img
      src={userAvatar || "https://ui-avatars.com/api/?name=" + userName}
      alt={userName}
      className="w-12 h-12 rounded-full object-cover border"
    />
    <div className="flex-1">
      <div className="font-semibold text-gray-800">{userName}</div>
    </div>
    <button
      onClick={onPayNow}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all"
    >
      Pay Now
    </button>
  </div>
);

export const UserList = () => {
  const navigate = useNavigate();
  const [user, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk?filter=" + filter
        );
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, [filter]);

  return (
    <div>
      <InputField
        label={"search"}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.map((users) => (
          <UserCard
            key={users._id || users.id || users.firstName}
            userName={users.firstName || ""}
            userAvatar={users.avatar}
            onPayNow={() =>
              navigate(
                "/send?id=" +
                  (users._id || users.id) +
                  "&name=" +
                  users.firstName
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
