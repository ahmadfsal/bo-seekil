export const copyToClipboard = (text) => {
    let textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};
