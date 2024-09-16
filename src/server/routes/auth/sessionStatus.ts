import {defineEventHandler, getCookie} from 'h3';
import { jwtDecode } from 'jwt-decode';

export default defineEventHandler(async (event) => {
    const isAuthenticated = getCookie(event, 'isAuthenticated');
    if (!isAuthenticated) {
        return {status: 401, isValidSession: false, message: 'User is not authenticated'};
    }
    const idToken = getCookie(event, 'idToken');
    if (!idToken) {
        return {status: 401, isValidSession: false, message: 'idtoken not found'};
    }
    const decodedToken = jwtDecode(idToken);
    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
        return {status: 401, isValidSession: false, message: 'id token'};
    }
    const accessToken = getCookie(event, 'accessToken');
    if (!accessToken) {
        return {status: 401, isValidSession: false, message: 'access token not found'};
    }
    const decodedAccessToken = jwtDecode(accessToken);
    if (decodedAccessToken.exp && Date.now() >= decodedAccessToken.exp * 1000) {
        return {status: 401, isValidSession: false, message: 'access token exp'};
    }

    return {status: 200, isValidSession: true};
});