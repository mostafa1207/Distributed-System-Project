import API_URL from "../keys";
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

  return data;
}

export async function updateUser(newUser) {
  const { username, city, address, phone } = newUser;
  const apiCall = await fetch(`${API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${Cookies.get("token")} `,
    },
    body: JSON.stringify({ username, city, address, phone }),
  });
  const data = await apiCall.json();
  return data;
}
