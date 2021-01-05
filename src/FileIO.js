const handleSaveToPC = jsonData => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'filename.json';
    link.href = url;
    link.click();
  }

export default function FileIO(obj){
    const handleSave = handleSaveToPC(obj);
    return{}
}