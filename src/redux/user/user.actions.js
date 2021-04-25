import userTypes from './user.types';
import { auth, handleUserProfile } from './../../firebase/utils';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    } catch (err) {
        console.log(err)
    }
};

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    if (password !== confirmPassword) {
        const error = ['Las contraseñas no coinciden']
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: error
        })
        return;
    }
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await handleUserProfile(user, { displayName });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        url: 'http://localhost:3000/login'
    };
    try {
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                })
            })
            .catch(() => {
                const error = ['Email no encontrado. Por favor intenta de nuevo.'];
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: error
                })
            })
    } catch (err) {
        console.log(err)
    }
}