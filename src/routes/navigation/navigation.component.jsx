import { Fragment} from "react";
import { Outlet} from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../features/cart/cartSlice";
import { selectCurrentUser } from "../../features/user/userSlice";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

import "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)

  //const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen)

  

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer  to={"/"}>
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks >
          <NavLink to={"/shop"}>
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN-OUT
            </NavLink>
          ) : (
            <NavLink to={"/auth"}>
              SIGN-IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
      </NavigationContainer>
      {isCartOpen && <CartDropdown />}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
