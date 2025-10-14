import React, { JSX } from "react";
import "./Sidebar.css";

type LinkItem = {
  name: string;
  path: string;
  icon?: JSX.Element;
};

interface NavBarProps {
  logoSrc?: string;
  alt?: string;
  title?: string;
  links: LinkItem[];
  activeLink: string;
  setActiveLink: (link: string) => void;
  onNavigate: (path: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  logoSrc,
  alt,
  title,
  links,
  activeLink,
  setActiveLink,
  onNavigate,
}) => {
  return (
    <div className="navbar">
      <div className="nav-edit">
        {/* {logoSrc && (
          <div className="title-container">
            <img src={logoSrc} alt={alt || "logo"} />
          </div>
        )} */}

        <div className="navbar-buttons-container">
          {/* {title && (
            <div className="title-text">
              <p className="nav-title">{title}</p>
            </div>
          )} */}

          {links.map((link) => (
            <button
              key={link.name}
              className={`nav-buttons ${
                activeLink === link.name ? "active" : ""
              }`}
              onClick={() => {
                setActiveLink(link.name);
                onNavigate(link.path);
              }}
            >
              {/* {React.cloneElement(link.icon, {
                fill: activeLink === link.name ? "#F44A0E" : "#4B5563",
                color: activeLink === link.name ? "#F44A0E" : "#4B5563",
              })} */}
              <p
                className="nav-button-text"
                style={{
                  color: activeLink === link.name ? "white" : "#4B5563",
                }}
              >
                {link.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
