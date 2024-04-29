import styled from "styled-components";

export default function Button(props) {

    const Button = styled.button`
        background-color: #BEF69C;
        padding: 1rem 2rem;
        border-radius: 15px;
        border: none;
        text-size: 2rem;
    `

    return (
        <>
            <Button>
                {props.icon}
                {props.text}
            </Button>
        </>
    );
}