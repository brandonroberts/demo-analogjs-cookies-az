import {defineEventHandler, deleteCookie, sendRedirect, setCookie} from 'h3';

export default defineEventHandler(async (event) => {
    deleteCookie(event, 'idToken');
    deleteCookie(event, 'accessToken');
    deleteCookie(event, 'account');
    setCookie(event, 'isAuthenticated', 'false');
    await sendRedirect(event, '/');
});