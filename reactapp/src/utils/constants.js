export const BASE_URL = "http://localhost:6060";

export function getHeader()
{
    const jwtToken = localStorage.getItem("jwtToken")
    
    const headers = {
        
        Authorization:`Bearer ${jwtToken}`,
    };
    
    return headers;
}