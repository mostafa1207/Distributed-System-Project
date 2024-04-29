import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Button(props) {

    const handler = () => {
        props.handler();
    }

    const Button = styled.button`
        background-color: ${props.color == "green" ? "var(--color-green)" : "var(--color-orange)"};
        padding: 1.2rem 2rem;
        border-radius: 12px;
        border: none;
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        &:hover {
            background-color: ${props.color == "green" ? "var(--color-green-hover)" : "var(--color-orange-hover)"};
        }
    `

    return (
        <>
            <Link to={props.path}>
                <Button onClick={handler}>
                    <props.icon />
                    {props.text}
                </Button>
            </Link>
        </>
    );
}