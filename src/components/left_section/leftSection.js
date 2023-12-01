import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import styles from "./leftSection.module.css";
import { dataSelector } from "../../redux/dataReducer";
import { useDispatch } from "react-redux";
import {setSelecterUser} from "../../redux/dataReducer";

export default function LeftSection ({setIsModalActive, setClickedUserId}) {
    const {CurrentcontactList} = useSelector(dataSelector);
    const dispatch = useDispatch();
    

    return(
        <section className={styles.leftSection_container}>
        <div className={styles.topNav}>
            <div className={styles.newChat} onClick={()=>setIsModalActive(true)}>
                <img src="https://cdn-icons-png.flaticon.com/128/10694/10694683.png"/>
                <p>New chat</p>
            </div>
        </div>
        <ul className={styles.current_chatlist}>
            {CurrentcontactList.map((user)=>(
            <li onClick={()=>{
                setClickedUserId(user.userId)
                dispatch(setSelecterUser(user.userId));
                
                
            }}>
                <img className={styles.profileImg} src={user.profilepic}/>
                <div className={styles.userName_txtBox}>
                <p className={styles.userName_txt}>{user.name}</p>
                </div>
            </li>
            ))}

        </ul>

        </section>
    )
}