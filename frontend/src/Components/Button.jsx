import { styled, css } from "styled-components";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../ui/SpinnerMini";

export default function Button(props) {
    const nav = useNavigate();

    const handler = () => {
        if (props.path) {
            nav(props.path);
        } else if (props.handler) {
            props.handler();
        }
    }

    const Button = styled.button`
        padding: 1.2rem 2rem;
        border-radius: 12px;
        border: none;
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        min-width: 15rem;

        ${(props) => {
            if (props.$color == "green") {
                return css`
                    background-color: var(--color-green);
                    &:hover {
                        background-color: var(--color-green-hover);
                    }
                `;
            } else if (props.$color == "orange") {
                return css` 
                    background-color: var(--color-orange);
                    &:hover {
                        background-color: var(--color-orange-hover);
                    }
                `;
            } else {
                return css`
                    background-color: var(--color-grey-300);
                    &:hover {
                        background-color: var(--color-grey-200);
                    }
                `;
            }
        }}

    `

    return (
        <>
            <Button type={props.type} onClick={handler} $color={props.color}>
                {props.isLoading ? <SpinnerMini /> :
                <>
                    {props.icon && <props.icon />}
                    {props.text}
                </>
                }
            </Button>
        </>
    );
}