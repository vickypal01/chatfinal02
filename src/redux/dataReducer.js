import { createSlice } from "@reduxjs/toolkit";
import {currentUsers, users} from "../data";
import { toast } from 'react-toastify';

// get current list of users {--done--}
// on list item click load the chats on the right section {--done--}
// Add new chat on currentUsers when selected from friendList {--done--}
// send message {--done--}

const dataSlice = createSlice({
    name: "Data",
    initialState: {loadChats: false, CurrentcontactList: [], selectedUser: null ,currentChats : [], currentUsers: currentUsers},
    reducers : {
        getCurrentusers : (state, action)=> {
            state.CurrentcontactList = state.currentUsers.contactList;
        },
        setSelecterUser : (state, action)=> {          
            const filteredUser = state.CurrentcontactList.find((user)=> user.userId === action.payload);
            state.selectedUser = filteredUser;
            state.currentChats = filteredUser.chats
            state.loadChats = true;
        },
        addNewChat : (state, action)=> {
            const filteredUser = users.find((user)=> user.userId === action.payload);
            console.log("Inside addNewChat : ",filteredUser);
            // Making sure the new user we want to add is not already present in the CurrentcontactList
            const isContactAlreadyPresent = state.CurrentcontactList.filter((contact)=> contact.userId === filteredUser.userId); 
            if(isContactAlreadyPresent.length >= 1){
                return;
            }
            state.CurrentcontactList = [
                ...state.CurrentcontactList,
                filteredUser
            ];
        },
        sendMessage: (state, action) => {
            const { clickedUserId , messageText } = action.payload;
            console.log("userId", clickedUserId);
            state.currentChats.push({
                text: messageText,
                sender: "me",
                messageId: state.currentChats.length + 1,
            })
            toast.success("message sent")
          }
    }
})

// Export Data Reducer
export const dataReducer = dataSlice.reducer;

// Export actions
export const {getCurrentusers, setSelecterUser, sendMessage, addNewChat} = dataSlice.actions;

// Exporting data selector 
export const dataSelector = (state)=> state.data;
