import styled from "styled-components";
import cartImage from "./../../assets/shopping-cart.png"
import LoginForm from "../Components/LoginForm";
import SignupForm from "../Components/SignupForm";
import { useEffect } from "react";
import Cookies from "js-cookie"

export default function LoginAndSignup(props) {

    useEffect(() => {
        Cookies.remove('token');
        Cookies.remove('tokenExpiryDate');
    })
    
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
        
        & span {
            font-size: 1.5rem;
            color: red;
        }
    `

    const FormContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 2rem;
        
        & form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
            min-width: 30rem;
        }
        
        & input, select, textarea {
            background-color: inherit;
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
            font-size: 16px;
            padding: 0.6em 1.2em;
            background-color: var(--color-grey-300);
            font-weight: 600;
            border: none;
        }

        & button:hover {
            background-color: var(--color-grey-200);
        }

        & a {
            text-decoration: underline;
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
                    <img src={cartImage} />
                </LeftContainer>
                    <RightContainer>
                        <h2>{props.loginOrSignup == "login" ? "Welcome back!" : "Sign Up"}</h2>
                        <FormContainer>
                            {props.loginOrSignup == "login" ? <LoginForm /> : <SignupForm />}
                        </FormContainer>
                    </RightContainer>
            </PageContainer>
        </>
    );
}
