export const BASE_URL = "https://8080-ecdaadcabcddabbcdedaeadabdedbf.project.examly.io";

export function getHeader()
{
    const jwtToken = localStorage.getItem("jwtToken")
    
    const headers = {
        
        Authorization:`Bearer ${jwtToken}`,
    };
    
    return headers;
}