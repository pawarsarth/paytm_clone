import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}

export const Users = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
 


  // ---------- Decode user ID from token ----------
  const token = localStorage.getItem("token") || null;
  let loggedInUserId: string | null = null;

  if (token) {
    const decoded = jwtDecode<DecodedToken>(token);
    loggedInUserId = decoded.id;
  }

  // ---------- Fetch users ----------
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/user/bulk?filter=${username}`)
      .then((res) => {
        const allUsers = res.data.user;

        // Remove current logged-in user
        const filtered = allUsers.filter(
          (u: any) => u._id !== loggedInUserId
        );

        setUsers(filtered);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, [username, loggedInUserId]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>

      <div className="my-2">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>

      <div>
        {users.map((user: any) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};




// ----------- Reusable User Card ------------
function User({ user }: { user: any }) {
    const navigate = useNavigate();
  return (
    <div className="flex justify-between p-2 border-b">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
   <button
   onClick={() => navigate(`/send?name=${user.firstName}&id=${user._id}`)}
// onClick={()=>{
//     navigate('/send')
// }}
  className="bg-blue-600 rounded text-white p-2"
>
  Send Money
</button>



      </div>
    </div>
  );
}
