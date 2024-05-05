import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { API_URL } from "../keys";
import { useState } from "react";
import SpinnerMini from "./../ui/SpinnerMini"

export default function SignupForm() {

    const nav = useNavigate();
    const [wrongSignup , setWrongSignup] = useState("");
    const [isLoading , setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let user = {};
        for (let entry of form.entries()) {
            user[entry[0]] = entry[1];
        }
        if (user["password"] != user["confirm_password"]) {
            setWrongSignup(`please enter the same password`);
            return
        }
        setIsLoading(true);
        fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.message == "User Created Successfuly.") {
                Cookies.set('userID', res.user._id, { expires: 7, secure: true });
                Cookies.set('token', res.token, { expires: 7, secure: true });
                Cookies.set('tokenExpiryDate', res.tokenExpiryDate, {expires: 7, secure: true});
                if (user["userType"] == "customer") {
                    nav("/user");
                } else if (user["userType"] == "seller") {
                    nav("/store")
                }
            } else {
                if (res.data[0].path == "email") {
                    setWrongSignup(res.data[0].msg);
                } else if (res.data[0].path == "password") {
                    setWrongSignup("please enter a password\nbetween 10 and 25 characters");
                } else {
                    setWrongSignup(`please enter a valid ${res.data[0].path}`);
                }
            }
            setIsLoading(false);
        });   
    }


    return (
        <>
            <form action="/" onSubmit={handleSubmit}>
                <select name="userType" id="userType" required>
                    <option value="" selected hidden>How will you use this account?</option>
                    <option value="customer">As a Customer</option>
                    <option value="seller">As a Seller</option>
                </select>
                <input name="username" type="text" placeholder="Username" required/>
                <input name="email" type="email" placeholder="Email" required/>
                <input name="password" type="password" placeholder="Password" required/>
                <input name="confirm_password" type="password" placeholder="Confirm password" required/>
                <select name="city" id="" required>
                    <option value="" selected hidden>City</option>
                    <option value="cairo">Cairo</option>
                    <option value="alex">Alex</option>
                </select>
                <span>{wrongSignup}</span>
                <button type="submit">{isLoading ? <SpinnerMini /> : "Submit" }</button>     
            </form>
            <p>Already a member? <Link to={"/login"}>Log-in here.</Link></p>
        </>
    );
}
