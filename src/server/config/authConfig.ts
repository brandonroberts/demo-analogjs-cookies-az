export const msalConfig = {
    auth: {
        clientId: import.meta.env['CLIENT_ID'], // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: import.meta.env['CLOUD_INSTANCE'] + import.meta.env['TENANT_ID'], // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: number, message: string, containsPii: boolean) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
}
export const REDIRECT_URI = import.meta.env['REDIRECT_URI']; 
export const POST_LOGOUT_REDIRECT_URI = import.meta.env['POST_LOGOUT_REDIRECT_URI'];
export const GRAPH_ME_ENDPOINT = import.meta.env['GRAPH_API_ENDPOINT'] + "v1.0/me";
export const API_ENDPOINT = import.meta.env['API_ENDPOINT'];


