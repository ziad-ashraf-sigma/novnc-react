import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router"; 
import styles from './Register.module.css'; 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerHeading}>Register</h2>
      <form onSubmit={handleRegister} className={styles.registerForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        <button type="submit" className={styles.registerButton}>
          Register
        </button>
      </form>

      <p className={styles.loginLink}>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#007bff" }}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;