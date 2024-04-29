import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { API_URL } from "../keys";
import { useState } from "react";

export default function LoginForm() {
    const nav = useNavigate();
    const [wrongLogin , setWrongLogin] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let user = {};
        for (let entry of form.entries()) {
            user[entry[0]] = entry[1];
        }
        fetch(`${API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.message == "User Logged In Successfuly.") {
                Cookies.set('token', res.token, { expires: 7, secure: true });
                Cookies.set('tokenExpiryDate', res.tokenExpiryDate, {expires: 7, secure: true});
                if (user["userType"] == "customer") {
                    nav("/user");
                } else if (user["userType"] == "seller") {
                    nav("/store")
                }
            } else {
                setWrongLogin(res.message);
            }
        });   
    }

    return (
        <>
            <form action="/" onSubmit={handleSubmit}>
                <select name="userType" id="userType" required>
                    <option value="" selected hidden>You are a</option>
                    <option value="customer">A Customer</option>
                    <option value="seller">A Seller</option>
                </select>
                <input type="email" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <span>{wrongLogin}</span>
                <button type="submit">Log in</button>
            </form>
            <p>Not a member yet? <Link to={"/signup"}>Register now!</Link></p>
            <p>Or <Link to={"/"}>browse as a guest.</Link></p>
        </>
    );
}
