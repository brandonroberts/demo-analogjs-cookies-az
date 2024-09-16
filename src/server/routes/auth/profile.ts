import { defineEventHandler, createError, getCookie } from 'h3';
import { GRAPH_ME_ENDPOINT } from '../../config/authConfig';
export default defineEventHandler(async (event) => {
    const accessToken = getCookie(event, 'accessToken');

   const graphResponse = await fetch(GRAPH_ME_ENDPOINT + "v1.0/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!graphResponse.ok) {
        throw createError({status: graphResponse.status, message: 'Error fetching user profile'});
    }
    const profile = await graphResponse.json();
    let photoMetadata = {};
    const graphPhoto = await fetch(GRAPH_ME_ENDPOINT + "v1.0/me/photo/$value", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (graphPhoto.ok) {
        photoMetadata = await graphPhoto.json();
    }
    
    return {...profile, ...photoMetadata};
});