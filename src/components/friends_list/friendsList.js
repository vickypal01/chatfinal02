import {useRef, useState, useEffect} from "react";
import {users} from "../../data";
import styles from "./friendsList.module.css"
import { useDispatch } from "react-redux";
import {addNewChat} from "../../redux/dataReducer";

export default function FriendsList ({isModalActive, setIsModalActive}) {
    const dispatch = useDispatch();
    const searchTermRef = useRef();
    const [friendsList, setFriendsList] = useState([]);

    useEffect(()=>{
        setFriendsList(users);
    },[])

    function searchByName () {
        const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTermRef.current.value.toLowerCase())
        );
        setFriendsList(filtered);
    }

    return(
        <div className={styles.modal_mainContainer}>
            <div className={styles.searchbox}>
                <input onKeyDown={searchByName} ref={searchTermRef} placeholder="Search by name" />
            </div>
            <span className={styles.closeModalBtn} onClick={()=>setIsModalActive(false)}>x</span>
            <ul className={styles.friends_list}>
                {friendsList.map((friend)=>(
                    <li key={friend.userId} onClick={()=>dispatch(addNewChat(friend.userId))}>
                        <div className={styles.profileImg}>
                            <img src={friend.profilepic}/>
                        </div>
                        <p className={styles.user_name}>{friend.name}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}