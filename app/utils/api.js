import axios from "axios";

// API Credentials
const clientId = "zGEY1ANVDOdMFa0Y3Bzy1P9w27mwyVmr";
const clientSecret = "1G1MEpy5yPs1FqRA";

// Initial API Token
export let apiToken = "";
export const apiBaseUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers";

// Function to Generate New Access Token
export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    apiToken = response.data.access_token; // Update the global token
    console.log("New API Token:", apiToken);
    return apiToken;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw new Error("Failed to fetch access token.");
  }
};

// Automatically Fetch Token on Import
getNewAccessToken();
