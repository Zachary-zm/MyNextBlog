import React from 'react';
import { NextPage } from 'next';
import NoHeader from '../xHeader';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

interface NoLayoutProps {
    title?: string,
    children?: React.ReactNode
}

const XLayout: NextPage<NoLayoutProps> = (props) => {
    const [showToTop, setshowToTop] = useState(false);

    const setScroll = () => {
        setshowToTop(window.scrollY > 300);
    }

    useEffect(() => {
        if (window) {
            window.addEventListener('scroll', setScroll);
        }
        return () => {
            window.removeEventListener('scroll', setScroll);
        }
    }, [])
    
    const toTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="container default">
            <div className="darkmode-background" />
            <div className="darkmode-layer" />
            <NoHeader />
            <div className='main-container' style={{'marginTop': '80px'}}>{props.children}</div>
            <div className="fixed-tools">
                <div className={showToTop ? 'show-to-top to-top' : 'to-top'} onClick={toTop}>
                    <FontAwesomeIcon icon={ faArrowCircleUp }  style={{'fontSize' : '3em', "marginRight": "0", "verticalAlign": "0"}}/>
                </div>
            </div>
        </div>
    );
}

export default XLayout;