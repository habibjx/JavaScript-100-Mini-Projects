/**
 * Date: 02-05-2025.
 * Author: M H R Habib.
 */

const input = document.getElementById("input");
const img = document.getElementById("img");
const create = document.getElementById("create");
const saveQr = document.getElementById("saveQr");

// Event Listener
create.addEventListener("click", handleCreateButton);
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        handleCreateButton();
    }
})
saveQr.addEventListener("click", handleSaveButton);



// Create QR qrCode

function handleCreateButton(){
    if(input.value){
        let qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`;
        img.src = qrCode;
    }
    else{
        alert("please Enter text or url");
    }
    
}

// Download QR qrCode

async function handleSaveButton(){
    const qrSrc = img.src;
    if (!qrSrc || !qrSrc.includes("https://api.qrserver.com")) {
        return alert("Please create a QR code first.");
    }

    try {
        const response = await fetch(qrSrc);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const aTag = document.createElement("a");
        aTag.href = blobUrl;
        aTag.setAttribute("download", "qr-code.png");

        // Very important: append to body before clicking
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);

        // Free up memory
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error(error);
        alert("Failed to download QR code.");
    }
}
