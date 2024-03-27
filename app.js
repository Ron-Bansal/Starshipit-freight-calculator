const zones = [
  {
    zone_name: "sydney",
    street: "20 George Street",
    suburb: "Sydney",
    city: "Sydney",
    state: "NSW",
    post_code: "2000",
    country_code: "AU",
  },
  {
    zone_name: "other-nsw",
    street: "123 Tweed Coast Road",
    suburb: "Cudgen",
    city: "Cudgen",
    state: "NSW",
    post_code: "2487",
    country_code: "AU",
  },
  {
    zone_name: "melbourne",
    street: "123 Collins St",
    suburb: "Melbourne",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000",
    country_code: "AU",
  },
  {
    zone_name: "other-vic",
    street: "11 Hosking Road",
    suburb: "Jeetho",
    city: "Jeetho",
    state: "VIC",
    post_code: "3945",
    country_code: "AU",
  },
  {
    zone_name: "brisbane",
    street: "123 Albion Avenue",
    suburb: "Miami",
    city: "Miami",
    state: "QLD",
    post_code: "4220",
    country_code: "AU",
  },
  {
    zone_name: "near-qld",
    street: "123 Collins St",
    suburb: "Melbourne",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000",
    country_code: "AU",
  },
  {
    zone_name: "mid-qld",
    street: "123 Collins St",
    suburb: "Melbourne",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000",
    country_code: "AU",
  },
  {
    zone_name: "nth-qld",
    street: "123 Collins St",
    suburb: "Melbourne",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000",
    country_code: "AU",
  },
  {
    zone_name: "perth",
    street: "123 Queen St",
    suburb: "Perth",
    city: "Perth",
    state: "WA",
    post_code: "6000",
    country_code: "AU",
  },
  {
    zone_name: "mid-wa",
    street: "123 Collins St",
    suburb: "Melbourne",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000",
    country_code: "AU",
  },
  {
    zone_name: "nth-wa",
    street: "123 Collins St",
    suburb: "Melbourne",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000",
    country_code: "AU",
  },
  {
    zone_name: "adelaide",
    street: "123 Queen St",
    suburb: "Adelaide",
    city: "Adelaide",
    state: "SA",
    post_code: "5000",
    country_code: "AU",
  },
  {
    zone_name: "other-sa",
    street: "123 Collins St",
    suburb: "Melbourne",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000",
    country_code: "AU",
  },
  {
    zone_name: "northern-territory",
    street: "1 Queen St",
    suburb: "Stuart Park",
    city: "Stuart Park",
    state: "NT",
    post_code: "0820",
    country_code: "AU",
  },
  {
    zone_name: "tasmania",
    street: "12 Hobart Rd",
    suburb: "South Launceston",
    city: "South Launceston",
    state: "TAS",
    post_code: "7249",
    country_code: "AU",
  },
];

let apiKey = "";
let subscriptionKey = "";

// "StarShipIT-Api-Key": "3b6ace8adb3f48e592a6026068a67d8d",
// "Ocp-Apim-Subscription-Key": "b686fcc9b8b546d0be824f91840148a9",

// Function to show the API key modal
function showApiKeyModal() {
  const modal = document.getElementById("api-key-modal");
  modal.style.display = "block";

  const storedApiKey = localStorage.getItem("apiKey");
  const storedSubscriptionKey = localStorage.getItem("subscriptionKey");

  if (storedApiKey && storedSubscriptionKey) {
    document.getElementById("api-key").value = apiKey;
    document.getElementById("subscription-key").value = subscriptionKey;
  }
}

// Function to close the API key modal
function closeApiKeyModal() {
  const modal = document.getElementById("api-key-modal");
  modal.style.display = "none";
}

// Function to save the API and Subscription keys
function saveApiKeys() {
  apiKey = document.getElementById("api-key").value;
  subscriptionKey = document.getElementById("subscription-key").value;

  if (apiKey && subscriptionKey) {
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("subscriptionKey", subscriptionKey);
    closeApiKeyModal();
    alert("API keys saved successfully!");
  } else {
    alert("Please enter both API Key and Subscription Key.");
  }
}

// Retrieve API and Subscription keys from localStorage
const storedApiKey = localStorage.getItem("apiKey");
const storedSubscriptionKey = localStorage.getItem("subscriptionKey");

if (storedApiKey && storedSubscriptionKey) {
  apiKey = storedApiKey;
  subscriptionKey = storedSubscriptionKey;
}

// Modify the calculateShippingRate function
function calculateShippingRate() {
  if (!apiKey || !subscriptionKey) {
    showApiKeyModal();
    return;
  }
}

function calculateShippingRate() {
  console.log("Calculating shipping rate...");
  document.getElementById("fetch-message").textContent = "Fetching results...";

  if (!apiKey || !subscriptionKey) {
    showApiKeyModal();
    return;
  }

  const formData = {
    sender: {
      street: document.getElementById("street").value,
      suburb: document.getElementById("suburb").value,
      city: document.getElementById("suburb").value,
      state: document.getElementById("state").value,
      post_code: document.getElementById("post-code").value,
      country_code: "AU", // Assuming the country code is always "AU"
    },
    packages: [
      {
        weight: parseFloat(document.getElementById("weight").value),
        height: parseFloat(document.getElementById("height").value / 10),
        width: parseFloat(document.getElementById("width").value / 10),
        length: parseFloat(document.getElementById("length").value / 10),
      },
    ],
    currency: "AUD",
  };

  console.log(
    "...from sender address",
    formData.sender,
    "with the package",
    formData.packages
  );

  const delay = 500; // Delay in milliseconds between requests
  const maxRetries = 3; // Maximum number of retries for failed requests
  let delayCounter = 0;

  const cacheKey = JSON.stringify(formData); // Create a cache key based on the form data
  const cachedData = localStorage.getItem(cacheKey); // Check if data is cached

  const customDeliveryAddress = {
    street: document.getElementById("delivery-street").value,
    suburb: document.getElementById("delivery-suburb").value,
    city: document.getElementById("delivery-suburb").value,
    state: document.getElementById("delivery-state").value,
    post_code: document.getElementById("delivery-post-code").value,
    country_code: "AU", // Assuming the country code is always "AU"
  };

  const isCustomAddressValid =
    customDeliveryAddress.street &&
    customDeliveryAddress.suburb &&
    customDeliveryAddress.city &&
    customDeliveryAddress.state &&
    customDeliveryAddress.post_code;

  const destinationAddresses = isCustomAddressValid
    ? [...zones, customDeliveryAddress]
    : zones;

  if (cachedData) {
    // If data is cached, use the cached data
    const cachedResults = JSON.parse(cachedData);
    cachedResults.forEach((data, index) => {
      if (data.success) {
        const rates = data.rates
          .map(
            (rate) => `${rate.service_name}: $${rate.total_price.toFixed(2)}`
          )
          .join("<br>");
        console.log(
          `Rates for ${
            destinationAddresses[index].zone_name || "Custom Address"
          }:`,
          rates
        );
        document.getElementById(
          `result-${destinationAddresses[index].zone_name || "custom-address"}`
        ).innerHTML = rates;
      } else {
        document.getElementById(
          `result-${destinationAddresses[index].zone_name || "custom-address"}`
        ).innerHTML = "Failed to get rates";
      }
    });

    // Show the "Completed" message
    document.getElementById("fetch-message").textContent = "Completed";
  } else {
    // If data is not cached, fetch from the API and cache the results
    const promises = destinationAddresses.map((destination, index) => {
      const requestData = { ...formData, destination };

      const fetchWithRetry = (retryCount = 0) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetch("https://api.starshipit.com/api/rates", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "StarShipIT-Api-Key": apiKey,
                "Ocp-Apim-Subscription-Key": subscriptionKey,
              },
              body: JSON.stringify(requestData),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success) {
                  const rates = data.rates
                    .map(
                      (rate) =>
                        `${rate.service_name}: $${rate.total_price.toFixed(2)}`
                    )
                    .join("<br>");
                  console.log(
                    `Rates for ${destination.zone_name || "Custom Address"}:`,
                    rates
                  );
                  document.getElementById(
                    `result-${destination.zone_name || "custom-address"}`
                  ).innerHTML = rates;
                  resolve(data);
                } else {
                  if (retryCount < maxRetries) {
                    console.log(
                      `Failed to get rates for ${
                        destination.zone_name || "Custom Address"
                      }. Retrying...`
                    );
                    fetchWithRetry(retryCount + 1)
                      .then(resolve)
                      .catch(reject);
                  } else {
                    document.getElementById(
                      `result-${destination.zone_name || "custom-address"}`
                    ).innerHTML = "Failed to get rates after multiple retries";
                    resolve(null);
                  }
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                if (retryCount < maxRetries) {
                  console.log(
                    `An error occurred for ${
                      destination.zone_name || "Custom Address"
                    }. Retrying...`
                  );
                  fetchWithRetry(retryCount + 1)
                    .then(resolve)
                    .catch(reject);
                } else {
                  document.getElementById(
                    `result-${destination.zone_name || "custom-address"}`
                  ).innerHTML = "An error occurred after multiple retries";
                  resolve(null);
                }
              });
          }, delayCounter * delay);
          delayCounter++;
        });
      };

      return fetchWithRetry();
    });

    Promise.all(promises)
      .then((results) => {
        localStorage.setItem(cacheKey, JSON.stringify(results));

        // Show the "Completed" message
        document.getElementById("fetch-message").textContent = "Completed";
      })
      .catch((error) => {
        console.error("Error caching data:", error);

        // Show the "Completed" message even if there's an error
        document.getElementById("fetch-message").textContent = "Request Complete - Error caching data";
      });
  }
}

const MAX_SAVED_ADDRESSES = 5;
let savedAddresses = [];

// Function to save the sender address
function saveSenderAddress() {
  const senderAddress = {
    street: document.getElementById("street").value,
    suburb: document.getElementById("suburb").value,
    city: document.getElementById("suburb").value,
    state: document.getElementById("state").value,
    post_code: document.getElementById("post-code").value,
    country_code: "AU",
  };

  if (savedAddresses.length < MAX_SAVED_ADDRESSES) {
    savedAddresses.push(senderAddress);
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
    displaySavedAddresses();
  } else {
    alert("You can save up to 3 addresses only.");
  }
}

// Function to display the saved addresses
function displaySavedAddresses() {
  const savedAddressesList = document.getElementById("saved-addresses-list");
  savedAddressesList.innerHTML = "";

  savedAddresses.forEach((address, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = address.street;
    listItem.addEventListener("click", () => populateSenderAddress(address));
    savedAddressesList.appendChild(listItem);
  });
}

// Function to populate the sender address fields
function populateSenderAddress(address) {
  document.getElementById("street").value = address.street;
  document.getElementById("suburb").value = address.suburb;
  document.getElementById("state").value = address.state;
  document.getElementById("post-code").value = address.post_code;
}

// Retrieve saved addresses from localStorage
const savedAddressesFromStorage = localStorage.getItem("savedAddresses");
if (savedAddressesFromStorage) {
  savedAddresses = JSON.parse(savedAddressesFromStorage);
}

// Display saved addresses on page load
displaySavedAddresses();
