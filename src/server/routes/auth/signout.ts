import {defineEventHandler, sendRedirect} from 'h3';

export default defineEventHandler(async (event) => {
    //Call the idp with post_logout_redirect_uri, get back to the app and delete cookies.
    await sendRedirect(event, '/api/auth/logoutCallback');
});