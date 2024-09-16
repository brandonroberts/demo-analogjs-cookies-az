import { defineEventHandler, createError, deleteCookie, getCookie, getQuery, setCookie, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await getQuery<{code: string, session_state: string}>(event); 
    if (!body) {
        throw createError('Error: response not found');
    }

    const authCodeRequest = {
        code: body['code'],
        scopes: ['User.Read'],
        redirectUri: import.meta.env['REDIRECT_URI'],
        codeVerifier: getCookie(event, 'pkce_verifier')
    };

    deleteCookie(event, 'pkce_verifier');
    
    // Call the idp to login and get the code to exchange for tokens
    // FAKE for the sample.
    
    setCookie(event, 'idToken', '1234-idtoken', {
        httpOnly: true,
        secure: true,
    });
    setCookie(event, 'accessToken', '1234-accesstoken', {
        httpOnly: true,
        secure: true,
    });
    setCookie(event, 'account', JSON.stringify({name: 'test'}), {
        httpOnly: true,
        secure: true,
    });
    setCookie(event, 'isAuthenticated', 'true');

    await sendRedirect(event, '/');
});
