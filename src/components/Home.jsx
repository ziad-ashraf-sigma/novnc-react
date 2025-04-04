import React, { useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router"
import { VncScreen } from 'react-vnc';
import styles from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();
    const ref = useRef();

    const vncUrl = import.meta.env.VITE_VNC_URL;
    const vncPassword = import.meta.env.VITE_VNC_PASSWORD;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.homeContainer}>
            <h2 className={styles.welcomeHeading}>Welcome to the Home Page!</h2>
            <div className={styles.vncScreen}>
                <VncScreen
                    url={vncUrl}
                    scaleViewport
                    background="#000000"
                    style={{
                        width: '92vw',
                        height: '93vh',
                    }}
                    ref={ref}
                    rfbOptions={{
                        credentials: {
                            password: vncPassword,
                        },
                    }}
                />
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Home;