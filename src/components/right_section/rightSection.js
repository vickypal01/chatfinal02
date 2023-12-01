import {useEffect, useRef} from "react";
import styles from "./rightSection.module.css"
import { useSelector, useDispatch } from "react-redux";
import {dataSelector, sendMessage, setCurrentUserChats} from "../../redux/dataReducer";

// Importing data of logged in user from Login page
import {userData as loggedUserData} from "../../pages/login_page/login";

export default function RightSection ({clickedUserId}) {
    const state = useSelector(dataSelector);
    const dispatch = useDispatch()
    const messageRef = useRef();   
    const {currentChats, selectedUser} = state;


    
    function handleSend(e) {
        e.preventDefault();
        const messageText = messageRef.current.value;
        if(messageText === ""){
            return;
        }
        dispatch(sendMessage({clickedUserId, messageText}))
        messageRef.current.value = "";
    }

    return(
        <section className={styles.rightSection_container}>
            <div className={styles.rightSection_topNav}>
                <div className={styles.filteredUser_profileCntr}>
                <img className={styles.Profile_img} src={state.selectedUser.profilepic}/>
                <p className={styles.filteredUserName}>{state.selectedUser.name}</p>
                </div>
                <img className={styles.callerIcon} src="https://cdn-user-icons.flaticon.com/63156/63156945/1700922375273.svg?token=exp=1700923276~hmac=267b71feb75c7e935cedc861d6789b07"/>
            </div>
            {/* ---- Chat section below ---- */}
            <ul className={styles.chatsContainer}>
                {currentChats.map((chat)=>{
                    if(chat.sender === "me"){
                        return(
                        <li className={styles.myText_li}>
                            <p className={styles.myChatText}>{chat.text}</p>
                            <img className={styles.myProfile_img} src={loggedUserData.profilepic}/>
                        </li>
                        )
                    } else {
                        return(
                        <li className={styles.contactText_li}>
                            <p className={styles.contactChatText}>{chat.text}</p>
                            <img className={styles.contactProfile_img} src={selectedUser.profilepic}/>
                        </li>
                        )
                    }
                })}

            </ul>
            {/*------ Bottom input box ------*/}
            <div className={styles.bottomInputContainer}>
                <input type="text" ref={messageRef} placeholder="Type a message here..." required/>
                <button className={styles.sendBtn} onClick={(e)=>handleSend(e)}>Send</button>
            </div>
        </section>
    )
}