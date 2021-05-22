import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess, userError } from './user.actions';

export function* getSnapShotFromUserAuth(user, additionalData = {}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
    } catch (err) {
        console.log(err)
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user)
    } catch (err) {
        console.log(err)
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);
    } catch (err) {
        console.log(err)
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
} }) {
    if (password !== confirmPassword) {
        const error = ['Las contraseñas no coinciden'];
        yield put(userError);
        return;
    }
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = { displayName }
        yield getSnapShotFromUserAuth(user, additionalData);
    } catch (error) {
        console.log(error);
    }
}

export function* onSignUpUserStart() {
    takeLatest(userTypes.SIGN_OUT_USER_START, signUpUser);
}

export default function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        all(onSignOutUserStart),
        call(onSignUpUserStart)
    ])
}