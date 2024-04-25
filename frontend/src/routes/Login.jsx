import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import cart from "./../../assets/shopping-cart.png"

export default function Login() {
    const { loginOrSignup } = useParams();
    const nav = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        let user = {};
        for (let entry of form.entries()) {
            user[entry[0]] = entry[1];
        }
        if (user["userType"] == "customer") {
            nav("/");
        } else if (user["userType"] == "seller") {
            nav("/store")
        }
    }

    const PageContainer = styled.div`
        background: linear-gradient(var(--color-peach) 0%, var(--color-violet) 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `

    const LeftContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
        width: 50%;

        & h1 {
            margin-top: 15rem;
            font-family: cursive;
            font-size: 5.8rem;    
        }

        & img {
            width: 40rem;
            filter: var(--invert);
        }
    `

    const RightContainer = styled.div`
        background-color: var(--color-grey-0);
        height: 100vh;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5rem;

        & h2 {
            font-size: 4.2rem;
        }

        & p {
            font-size: 2rem;
        }
    `

    const FormContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        & form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        & input, select, textarea {
            background-color: inherit;
            min-width: 30rem;
            font-size: 1.6rem;
            font-family: sans-serif;
            padding: 0.6em 1.2em;
            border: none;
            border-bottom: solid 2px var(--color-grey-700);
            resize: none;
        }

        & option {
            background-color: var(--color-grey-0);
            color: var(--color-grey-700);
        }
        
        & input::placeholder, & textarea::placeholder, select:invalid {
            color: var(--color-grey-500);
        }
        
        & :focus-visible {
            outline: none;
        }
        
        & button {
            min-width: 30rem;
            font-size: 16px;
            padding: 0.6em 1.2em;
            background-color: var(--color-grey-300);
            font-weight: 600;
            border: none;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            transition: background-color 5000s ease-in-out 0s;
            -webkit-text-fill-color: var(--color-grey-700);
        }
    `

    return (
        <>
            <PageContainer>
                <LeftContainer>
                    <h1>Handasa Shop</h1>
                    <img src={cart} />
                </LeftContainer>
                {loginOrSignup == "login" ? 
                    <RightContainer>
                        <h2>Welcome back!</h2>
                        <FormContainer>
                            <form action="/" onSubmit={handleSubmit}>
                                <select name="userType" id="userType" required>
                                    <option value="" selected hidden>You are a</option>
                                    <option value="customer">A Customer</option>
                                    <option value="seller">A Seller</option>
                                </select>
                                <input type="email" name="email" placeholder="Email" required/>
                                <input type="password" name="password" placeholder="Password" required/>
                                <button type="submit">Log in</button>
                            </form>
                            <p>Not a member yet? <Link to={"/signup"}>Register now!</Link></p>
                        </FormContainer>
                    </RightContainer>
                :
                    <RightContainer>
                        <h2>Sign Up</h2>
                        <FormContainer>
                            <form action="/" onSubmit={handleSubmit}>
                                <select name="userType" id="userType" required>
                                    <option value="" selected hidden>How will you use this account?</option>
                                    <option value="customer">As a Customer</option>
                                    <option value="seller">As a Seller</option>
                                </select>
                                <input name="username" type="text" placeholder="Username" required/>
                                <input name="email" type="email" placeholder="Email" required/>
                                <input name="password" type="password" placeholder="Password" required/>
                                <input type="password" placeholder="Confirm password" required/>
                                <select name="city" id="" required>
                                    <option value="" selected hidden>City</option>
                                    <option value="Cairo">Cairo</option>
                                    <option value="Alex">Alex</option>
                                </select>
                                <button type="submit">Submit</button>
                            </form>
                        <p>Already a member? <Link to={"/login"}>Log-in here.</Link></p>
                        </FormContainer>
                    </RightContainer>
                }
            </PageContainer>
        </>
    );
}
