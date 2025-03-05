const apiUrls = [
    "https://api.uspeoplesearch.net/tcpa/v1?x=",
    "https://api.uspeoplesearch.net/person/v3?x=",
    "https://premium_lookup-1-h4761841.deta.app/person?x=",
    "https://api.uspeoplesearch.net/tcpa/report?x="
];

async function checkDNCStatus() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    if (!phoneNumber) {
        alert("Please enter a phone number");
        return;
    }

    document.getElementById("result").style.display = "none"; // Hide result initially

    try {
        const results = await getDNCResults(phoneNumber);
        displayResults(results);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function getDNCResults(phoneNumber) {
    for (const url of apiUrls) {
        try {
            const response = await fetch(url + phoneNumber);
            if (!response.ok) continue; // Skip if response is not OK
            const data = await response.json();
            
            return {
                phone: phoneNumber,
                state: data.state || "Unknown",
                dncNational: data.DNCNational || "Unknown",
                dncState: data.DNCState || "Unknown",
                litigator: data.Litigator || "Unknown",
                blacklist: data.Blacklist || "Unknown"
            };
        } catch (error) {
            console.log("API failed:", url, error);
        }
    }
    throw new Error("No valid API response");
}

function displayResults(data) {
    document.getElementById("phone").innerText = data.phone;
    document.getElementById("state").innerText = data.state;
    document.getElementById("dncNational").innerText = data.dncNational;
    document.getElementById("dncState").innerText = data.dncState;
    document.getElementById("litigator").innerText = data.litigator;
    document.getElementById("blacklist").innerText = data.blacklist;

    document.getElementById("result").style.display = "block";
}
