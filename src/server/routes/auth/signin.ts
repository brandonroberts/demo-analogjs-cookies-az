import { defineEventHandler, sendRedirect, setCookie } from 'h3';
import {CryptoProvider} from '@azure/msal-node';
import { REDIRECT_URI } from '../../config/authConfig';
import * as crypto from 'node:crypto';

export default defineEventHandler(async (event) => {    
    const cryptoProvider = new CryptoProvider();

    // Generate PKCE Codes before starting the authorization flow
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    //Store the PKCE Codes in a secure location to send in the token request
    setCookie(event, 'pkce_verifier', verifier, {
        httpOnly: true,
        secure: true,
    });

    const authCodeUrlRequest = {
        scopes: ['User.Read'],
        redirectUri: REDIRECT_URI,
        codeChallenge:challenge,
        codeChallengeMethod: 'S256',
    };

    //FAKE for the sample.
    // real implementation: get the url for the IDP and send a redirect to the idp with a redirect uri.
    // For the sample, we do like the login flow is successful and we get a code back to redirect to the callback uri.
    await sendRedirect(event, '/api/auth/callback?code=fakecode&session_state=fakesession');
});

function generateCodeVerifier(length: number = 128): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
        result += charset[values[i] % charset.length];
    }
    return result;
  }

  async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
  }