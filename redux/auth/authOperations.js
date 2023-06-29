import { db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const authSingUpUser = ({ email, password, login}) => async (dispatch, getState) => {
    try {
       const user = await createUserWithEmailAndPassword(auth, email, password);
         console.log(user)
  
    } catch (error) {
        console.log(error);
        console.log(error.message)
    }
 };


export const authSingInUser = () => async (dispatch, getState) => { 
    try {
        
    } catch (error) {
        
    }
};


export const authSingOutUser = () => async (dispatch, getState) => { 
    try {
        
    } catch (error) {
        
    }
};