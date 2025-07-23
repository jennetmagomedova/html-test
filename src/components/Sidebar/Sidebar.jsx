import { useState } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "motion/react";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

/** themes */

const darkTheme = {
  sidebarDefault: "var(--color-sidebar-background-dark-default)",
  sidebarHover: "var(--color-sidebar-background-dark-hover)",
  sidebarActive: "var(--color-sidebar-background-dark-active)",

  textDefault: "var(--color-text-dark-default)",
  textHover: "var(--color-text-dark-hover)",
  textActive: "var(--color-text-dark-active)",

  textLogo: "var(--color-text-logo-dark-default)",

  buttonDefault: "var(--color-button-background-dark-default)",
  buttonActive: "var(--color-button-background-dark-active)",
};

const lightTheme = {
  sidebarDefault: "var(--color-sidebar-background-light-default)",
  sidebarHover: "var(--color-sidebar-background-light-hover)",
  sidebarActive: "var(--color-sidebar-background-light-active)",

  textDefault: "var(--color-text-light-default)",
  textHover: "var(--color-text-light-hover)",
  textActive: "var(--color-text-light-active)",

  textLogo: "var(--color-text-logo-light-default)",

  buttonDefault: "var(--color-button-background-light-default)",
  buttonActive: "var(--color-button-background-light-active)",
};

/** styled components  */
const Bar = styled.div`
  width: fit-content;
  height: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  border: 2px solid ${({ theme }) => theme.textDefault};
  border-radius: 8px;
  background: ${({ theme }) => theme.sidebarDefault};
  color: ${({ theme }) => theme.textDefault};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const LogoLabel = styled(motion.span)`
  color: ${({ theme }) => theme.textLogo};
  margin-inline: 10px 40px;
`;

const SidebarToggler = styled.div`
  position: absolute;
  right: -60px;
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.buttonDefault};
  transition: all 0.3s linear;

  &.opened {
    transform: translateX(-40px);
    justify-content: flex-end;
    width: 16px;
    height: 32px;
    border-radius: 32px 0 0 32px;
    background-color: ${({ theme }) => theme.buttonActive};
  }
`;

const ThemeToggler = styled.div`
  input {
    opacity: 0;
    position: absolute;
  }

  label {
    background-color: ${({ theme }) => theme.sidebarActive};
    width: 40px;
    height: 20px;
    border-radius: 50px;
    position: relative;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-inline: auto;
  }

  span {
    background-color: ${({ theme }) => theme.textDefault};
    width: 16px;
    height: 16px;
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    transition: transform 0.2s linear;
  }

  input:checked + label span {
    transform: translateX(20px);
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:last-child {
    margin-top: auto;
  }
`;

const MenuItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: fit-content;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  padding-inline: 10px;

  &:hover {
    background: ${({ theme }) => theme.sidebarHover};
    color: ${({ theme }) => theme.textHover};
  }

  &.active {
    background: ${({ theme }) => theme.sidebarActive};
    color: ${({ theme }) => theme.textActive};
  }

  svg {
    width: 18px;
    height: 18px;
    padding: 0;
  }
`;

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [theme, setTheme] = useState(color);
  const [activeTitle, setActive] = useState("Home");
  const containerClassnames = classnames("sidebar", { opened: isOpened });

  const goToRoute = (path) => {
    console.log(`going to "${path}"`);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  const toggleTheme = () => {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  };

  const toggleActive = (title) => {
    setActive(title);
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Bar className={containerClassnames}>
        <Header>
          <img src={logo} alt="TensorFlow logo" width={40} height={40} />
          <AnimatePresence>
            {isOpened && (
              <LogoLabel
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                TensorFlow
              </LogoLabel>
            )}
          </AnimatePresence>

          <SidebarToggler
            onClick={toggleSidebar}
            className={isOpened ? "opened" : ""}
          >
            <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
          </SidebarToggler>
        </Header>
        <ThemeToggler>
          <input type="checkbox" id="checkbox" onChange={toggleTheme} />
          <label htmlFor="checkbox">
            <span></span>
          </label>
        </ThemeToggler>
        <MenuList>
          {routes.map((route) => (
            <MenuItem
              className={activeTitle === route.title ? "active" : ""}
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
                toggleActive(route.title);
              }}
            >
              <FontAwesomeIcon icon={route.icon} />
              <AnimatePresence>
                {isOpened && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {route.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </MenuItem>
          ))}
        </MenuList>
        <MenuList>
          {bottomRoutes.map((route) => (
            <MenuItem
              className={activeTitle === route.title ? "active" : ""}
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
                toggleActive(route.title);
              }}
            >
              <FontAwesomeIcon icon={route.icon} />
              <AnimatePresence>
                {isOpened && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {route.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </MenuItem>
          ))}
        </MenuList>
      </Bar>
    </ThemeProvider>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
