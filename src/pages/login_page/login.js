import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authReducer";
import styles from './login.module.css';


// Dummy logged user data and credentials 
export const userData = {
    email: "adalovelace@email.com",
    password : "adalove123",
    profilepic : "https://images.newscientist.com/wp-content/uploads/2021/05/11162637/ada-lovelace-htkrgb_web.jpg"
}

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();


    function handleSubmit(e){
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // Check the password length 
        if(password.length <= 8) {
            // Notify the user
            alert("password should be minimum 8 characters")
            passwordRef.current.value = "";
            return;
        }
        // matching email/password with userData
        if(password !== userData.password || email !== userData.email){
            // Notify the user of incorrect email or password
            alert("Incorrect Username or Password");
            clearInput();
        }

        // As email and passwords are correct
        console.log("Successfully logged In");
        dispatch(login());

        function clearInput(){
            emailRef.current.value = "";
            passwordRef.current.value = "";
        }
        clearInput();
    }

    return(
        <>
        <div className={styles.login_container}>
        <p>Login</p>
        <form className={styles.formContainer}>
            <input type="email" ref={emailRef} placeholder="Email"/>
            <input type="password" ref={passwordRef} placeholder="Password" required/>
            <button onClick={(e)=>handleSubmit(e)} className={styles.loginBtn}>Login</button>
        </form>    
        </div>
        </>
    )
}