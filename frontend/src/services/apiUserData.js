import { API_URL } from "../keys";
import Cookies from "js-cookie";

export async function getUserData() {
  const apiCall = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${Cookies.get("token")} `,
    },
  });
  const data = await apiCall.json();

  return data.user;
}

export async function updateUser(newUserField) {
  const {username, city, address, phone}  = await getUserData();
  const apiCall = await fetch(`${API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${Cookies.get("token")} `,
    },
    body: JSON.stringify({username, city, address, phone, ...newUserField}),
  });
  const data = await apiCall.json();
  return data;
}
