<<<<<<< HEAD
export const BASE_URL = "http://localhost:8080";
=======
export const BASE_URL = "http://localhost:6060";

export function getHeader()
{
    const jwtToken = localStorage.getItem("jwtToken")
    
    const headers = {
        
        Authorization:`Bearer ${jwtToken}`,
    };
    
    return headers;
}
>>>>>>> abcee0066189caa56655d8d0f0f6b3d26f3785b8
