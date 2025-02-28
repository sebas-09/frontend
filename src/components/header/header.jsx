import { useContext, useState } from "react";
import Logo from "../logo/logo";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/index.css";
import "./header.css";
import Cart from "../cart/cart";
import { AuthContext } from "../../contexts/auth.context";
import CartContext from "../../contexts/cart.contect";

function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setCart] = useState(false);
  const { cart } = useContext(CartContext);
  const { user, toggleUser } = useContext(AuthContext);
  const [searchKey, setSearchKey] = useState("");

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const toggleCart = () => {
    setCart((prev) => !prev);
  };

  const onSearch = () => {
    if (searchKey !== "") {
      navigate(`/search/${searchKey}`);
    }
  };

  const onSearchKeyChange = (newKey) => {
    setSearchKey(newKey);
  };

  const logout = () => {
    localStorage.removeItem("user");
    toggleUser();
    navigate("/");
  };

  return (
    <>
      <header className="app-header">
        <div className="logo-wrapper">
          <span>
            {isNavOpen ? (
              <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={toggleNav}
              ></i>
            ) : (
              <i
                className="fa fa-bars"
                aria-hidden="true"
                onClick={toggleNav}
              ></i>
            )}
          </span>
          <span>
            <Link to="/">
              <Logo />
            </Link>
          </span>
        </div>

        <div className="search">
          <input
            type="search"
            placeholder="Buscar productos..."
            value={searchKey}
            onChange={(e) => onSearchKeyChange(e.target.value)}
          />
          <i className="fa fa-search" aria-hidden="true" onClick={onSearch}></i>
        </div>

        <ul className={isNavOpen ? "nav-open" : "nav-close"}>
          {/* Mostrar "Productos" solo si el usuario NO es ADMIN */}
          {(!user || !user.roles?.includes("ROLE_ADMIN")) && (
            <li>
              <Link to="/products/All" className="nav-link">
                Productos
              </Link>
            </li>
          )}

          {/* Opciones para ADMIN */}
          {user?.roles?.includes("ROLE_ADMIN") && (
            <>
              <li>
                <Link to="/admin/categories" className="nav-link">
                  Administrar Categorías
                </Link>
              </li>
              <li>
                <Link to="/admin/products" className="nav-link">
                  Administrar Productos
                </Link>
              </li>
              <li>
                <Link to="/admin/orders" className="nav-link">
                  Administrar Órdenes
                </Link>
              </li>
            </>
          )}

          {/* Opciones para USUARIOS */}
          {user?.roles?.includes("ROLE_USER") && (
            <li>
              <Link to="/my/account" className="nav-link">
                Mi Cuenta
              </Link>
            </li>
          )}

          {/* Login / Logout */}
          {!user ? (
            <li>
              <Link to="/auth/login" className="nav-link">
                Iniciar Sesión
              </Link>
            </li>
          ) : (
            <li
              className="nav-link"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Cerrar Sesión
            </li>
          )}
        </ul>

        {/* Mostrar carrito solo si el usuario NO es ADMIN */}
        {user && !user.roles?.includes("ROLE_ADMIN") && (
          <div>
            <Link onClick={toggleCart}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span>({cart.noOfCartItems || 0})</span>
            </Link>
          </div>
        )}
      </header>

      <header className="app-header bottom">
        <div className="search">
          <input
            type="search"
            placeholder="Buscar productos..."
            value={searchKey}
            onChange={(e) => onSearchKeyChange(e.target.value)}
          />
          <i className="fa fa-search" aria-hidden="true" onClick={onSearch}></i>
        </div>
      </header>

      <Cart
        isCartOpen={isCartOpen}
        setIsCartOpen={setCart}
        onClose={() => setCart(false)}
      />
    </>
  );
}

export default Header;
