const fileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const base64ToFile = (base64Data: string, filename: string) => {
    const base64 = base64Data.split(',')[1]; 
  
    const byteCharacters = atob(base64)
    const byteArrays = new Uint8Array(byteCharacters.length)
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }
  
    const blob = new Blob([byteArrays], { type: 'image/png' }); 
    const file = new File([blob], filename, { type: 'image/png' });
    return file;
  }
  
export {fileToBase64, base64ToFile}