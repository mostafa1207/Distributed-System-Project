import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DarkModeToggle from "../ui/DarkModeToggle";
import { FiLogOut } from 'react-icons/fi'
import { RiAccountCircleLine, RiShoppingCart2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

export default function Base(props) {
  const nav = useNavigate();

  useEffect(() => {
    //nav('/login')
  });

  const handleSearch = (event) => {
    event.preventDefault();
    event.target.reset();
  }

  const Body = styled.div`
    background: linear-gradient(var(--color-grey-200) 0%, var(--color-grey-100) 100%);
    min-height: 100vh;
  `

  const Nav = styled.nav`
    background: var(--color-grey-0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    font-size: 2rem;
    box-shadow: 0 4px 8px 0 var(--color-grey-300);
  `

  const NavButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    border-radius: var(--border-radius-sm);

    &:hover {
      background-color: var(--color-grey-200);
      color: var(--color-blue-700);
      text-decoration: underline;
    }
  `
  const NavButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-right: 2rem;
  `

  const Search = styled.form`
    display: flex;
    background-color: var(--color-grey-200);
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    padding: 0 2rem 0 0;

    & input, & input:focus {
      background-color: var(--color-grey-200);
      border-radius: 50px;
      min-width: 50rem;
      border: none;
      outline: none;
      padding: 0.6rem 0.6rem 0.6rem 2.2rem;  
    }
  `

  return (
    <>
      <Body>
        <Nav>
          <div className="logo">
            <Link to={props.userType == "customer" ? "/" : "/store"}>LOGO</Link>
          </div>
          <Search onSubmit={handleSearch}>
            <input type="text" 
              placeholder={props.userType == "customer"
                ? "What are you looking for?"
                : "Search your products"} />
            
            <FaSearch />
          </Search>
          <NavButtonsContainer>
            <DarkModeToggle></DarkModeToggle>
            {props.userType == "customer" &&
              <NavButton to={"/cart"}>
                <RiShoppingCart2Fill />
                Cart
              </NavButton>
            }
            <NavButton to={props.userType == "customer" ? "/profile" : "/store/profile"}>
              <RiAccountCircleLine />
              Profile
            </NavButton>
            <NavButton to={"/login"}>
              <FiLogOut />
              Logout
            </NavButton>
          </NavButtonsContainer>
        </Nav>
        <Outlet />

        <footer></footer>
      </Body>
    </>
  );
}
