import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
  }
  
  &:hover svg{
    color: var(--color-blue-700);
  }

  &:focus {
    outline: none;
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-grey-600);
  }
`;

export default ButtonIcon;
