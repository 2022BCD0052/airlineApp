import axios from "axios";
export const apiToken = "hLZhF2Jxw9TdxR0I0VyhalcHGVAB";
export const apiBaseUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers"

const clientId = "zGEY1ANVDOdMFa0Y3Bzy1P9w27mwyVmr"
const clientSecret = "1G1MEpy5yPs1FqRA"

let newApiToken = ""
const getNewAccessToken  = async()=>{
    try {
        const response = await axios.post(
            "https://test.api.amadeus.com/v2/security/oauth2/token",
            {
                clientId:clientId,
                clientSecret:clientSecret,
                grant_type: "client_credentials"
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );
        newApiToken = response.data.access_token;
        console.log( newApiToken);
    } catch (error) {
        console.error(error);
        
    }
  
}
getNewAccessToken();

