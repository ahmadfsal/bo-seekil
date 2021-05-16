export const base64PdfNewTab = (base64str = '') => {
    let byteCharacters = atob(base64str);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let file = new Blob([byteArray], {
        type: 'application/pdf;base64'
    });
    let fileURL = URL.createObjectURL(file);
    window.open(fileURL);
};
