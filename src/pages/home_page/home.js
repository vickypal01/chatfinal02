import {useState, useEffect} from "react";
import styles from "./home.module.css"
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout } from "../../redux/authReducer";
import {getCurrentusers} from "../../redux/dataReducer";
import { dataSelector } from "../../redux/dataReducer";



// Importing section components
import LeftSection from "../../components/left_section/leftSection";
import RightSection from "../../components/right_section/rightSection";
import FriendsList from "../../components/friends_list/friendsList";

export default function Home (){
    const dispatch = useDispatch();
    const {loadChats} = useSelector(dataSelector);

    const {isLogin} = useSelector(authSelector)
    const [isModalActive, setIsModalActive] = useState(false);
    const [clickedUserId, setClickedUserId] = useState(null);

    useEffect(()=>{
        dispatch(getCurrentusers());
        console.log("Inside home", isLogin)
        
    },[])


    const handleabc = (userId) =>{
        setClickedUserId(userId)
    }
    return(
        <div className={styles.main_container}>
        <div className={styles.mainNav}>
           <p className={styles.appTitle}>Chat hub</p>
           <div className={styles.logoutBtn} onClick={()=>dispatch(logout())}>
            <img src="https://cdn-icons-png.flaticon.com/128/4043/4043198.png"/>
           </div>
        </div> 
        
        <div className={styles.homeContainer}>
        {isModalActive? <FriendsList isModalActive={isModalActive} setIsModalActive={setIsModalActive}/> : null}
        <LeftSection setIsModalActive={setIsModalActive} setClickedUserId={handleabc}/>
        {loadChats ? <RightSection clickedUserId={clickedUserId}/> : null}
        </div>
        </div>

    )
}