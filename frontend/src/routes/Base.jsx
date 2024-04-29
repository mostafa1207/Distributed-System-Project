import { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import DarkModeToggle from "../ui/DarkModeToggle";
import { FiLogOut } from 'react-icons/fi'
import { RiAccountCircleLine, RiShoppingCart2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import Cookies from "js-cookie"
import { ProductsProvider } from "./../context/ProductsContext";

export default function Base(props) {
  const nav = useNavigate();
  const route = useLocation().pathname.split("/")[1];

  useEffect(() => {
    if (route == "user" || route == "store") {
      if(Cookies.get('token') == undefined || Cookies.get('tokenExpiryDate') < Date.now()) {
        nav('/login')
      }
    }
  });

  const handleSearch = (event) => {
    event.preventDefault();
    event.target.reset();
  }

  const Body = styled.div`
    background: linear-gradient(var(--color-grey-100) 0%, var(--color-grey-50) 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  `

  const Nav = styled.nav`
    background: var(--color-grey-0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    font-size: 2rem;
    box-shadow: 0 4px 8px 0 var(--color-grey-300);
    width: 100%;
    gap: 1rem
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
    flex-grow: 1;
    max-width: 55rem;
    
    & input, & input:focus {
      background-color: var(--color-grey-200);
      border-radius: 50px;
      flex-grow: 1;
      border: none;
      outline: none;
      padding: 0.6rem 0.6rem 0.6rem 2.2rem;  
    }

    & input::placeholder {
      color: var(--color-grey-500);
    }
  `

  return (
    <>
      <Body>
        <Nav>
          <div className="logo">
            <Link to={"/" + route}>LOGO</Link>
          </div>
          <Search onSubmit={handleSearch}>
            <input type="text" 
              placeholder={props.userType == "seller"
                ? "Search your products"
                : "What are you looking for?"} />
            
            <FaSearch />
          </Search>
          {props.userType == "customer" || props.userType == "seller" ?
            <NavButtonsContainer>
              <DarkModeToggle></DarkModeToggle>
              {props.userType == "customer" &&
                <NavButton to={"cart"}>
                  <RiShoppingCart2Fill />
                  Cart
                </NavButton>
              }
              <NavButton to="profile">
                <RiAccountCircleLine />
                Profile
              </NavButton>
              <NavButton to={"/login"}>
                <FiLogOut />
                Logout
              </NavButton>
            </NavButtonsContainer>
          :
            <NavButtonsContainer>
              <DarkModeToggle></DarkModeToggle>
              <NavButton to="/login">
                Login
              </NavButton>
              <NavButton to="/signup">
                Signup
              </NavButton>
            </NavButtonsContainer>
          }
        </Nav>
          <ProductsProvider>
        <Outlet context={props.userType} />
            
          </ProductsProvider>

        <footer></footer>
      </Body>
    </>
  );
}
