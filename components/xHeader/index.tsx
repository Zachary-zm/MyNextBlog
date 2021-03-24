import { NextPage } from "next";
// import { Menu, Button, Dropdown } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faUser, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./index.less";

interface xHeaderProps {
    onUserClick?: (e: any) => Promise<void>;
    isCollapsed?: boolean;
}

const xHeader: NextPage<xHeaderProps> = () => {
    const router = useRouter();
    // const { onUserClick } = props;
    const [showMenu] = useState(false)

    const toggleMode = () => {
        const container = document.body;
        if (container.classList.contains("dark-mode")) {
            container.classList.remove("dark-expaned");
            setTimeout(() => {
                container.classList.remove("dark-notransition");
                container.classList.remove("dark-mode");
                container.classList.add("light-mode");
            }, 10);
            localStorage.removeItem("dark-mode");
        } else {
            container.classList.remove("light-mode");
            container.classList.add("dark-mode");
            setTimeout(() => {
                container.classList.add("dark-notransition");
                container.classList.add("dark-expaned");
            }, 300);
            localStorage.setItem("dark-mode", "1");
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-header">
                <a className="navbar-brand" href="/">
                    <h4>Zachary</h4>
                </a>
            </div>
            <div
                className={showMenu ? "showMenu navbar-collapse" : "navbar-collapse"}
            >
                <ul>
                    <li
                        className={
                            router.route === "/" || router.route.startsWith("/blog")
                                ? "blog-active"
                                : ""
                        }
                    >
                        <Link href="/">
                            <a>
                                <FontAwesomeIcon icon={faPenNib} />
                博客
              </a>
                        </Link>
                        <div className="nav-line" />
                    </li>
                    <li className={router.route === "/profile" ? "profile-active" : ""}>
                        <Link href="/profile">
                            <a>
                                <FontAwesomeIcon icon={faUser} />
                关于
              </a>
                        </Link>
                        <div className="nav-line" />
                    </li>
                    <li className={router.route === "/ssr" ? "profile-active" : ""}>
                        <Link href="/ssr">
                            <a>
                                <FontAwesomeIcon icon={faUser} />
                关于3
              </a>
                        </Link>
                        <div className="nav-line" />
                    </li>
                    <li className={router.route === "/ssg" ? "profile-active" : ""}>
                        <Link href="/ssg">
                            <a>
                                <FontAwesomeIcon icon={faUser} />
                静态
              </a>
                        </Link>
                        <div className="nav-line" />
                    </li>
                    <li className="dark-tools">
                        <a
                            className="dark-mode-btn"
                            title="深色模式"
                            onClick={toggleMode}
                        >
                            <FontAwesomeIcon icon={faSun} />
                        </a>
                        <a
                            className="light-mode-btn"
                            title="浅色模式"
                            onClick={toggleMode}
                        >
                            <FontAwesomeIcon icon={faMoon} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default xHeader;
