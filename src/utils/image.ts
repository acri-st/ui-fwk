
// Convert hex to bytes
const hexToBytes = (hex: string): Uint8Array => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
    };

    // Convert bytes to base64
    const bytesToBase64 = (bytes: Uint8Array): string => {
    let binary = "";
    bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
    return btoa(binary);
};

export const hexToImage = (hexString: string) =>{
    // Convert hex to base64
    const byteArray: Uint8Array = hexToBytes(hexString.startsWith("x'") ? hexString.replace(/^x'/, '') : hexString);
    const base64String: string = bytesToBase64(byteArray);
    return `data:image/png;base64,${base64String}`;
}