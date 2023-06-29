import { db } from '../../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const authSingUpUser = ({ email, password, login}) => async (dispatch, getState) => {
    try {
       const user = await createUserWithEmailAndPassword(auth, email, password);
        //  console.log(user)
  
    } catch (error) {
        console.log(error);
        console.log(error.message)
    }
 };


export const authSingInUser = ({ email, password}) => async (dispatch, getState) => { 
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
              console.log(user)
    } catch (error) {
        console.log(error);
        console.log(error.message)
    }
};


export const authSingOutUser = () => async (dispatch, getState) => { 
    try {
        
    } catch (error) {
        
    }
};