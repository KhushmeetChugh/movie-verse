import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const uploadPhoto = async () => {
    try {
      if (!file) {
        setMsg("No file detected");
        return;
      }
      const formData = new FormData();
      formData.append('photo', file);
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error with status ${response.status}`, errorData);
      } else {
        const data = await response.json();
        console.log("Success+", data);
        setMsg('File upload success');
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadPhoto}>Upload</button>
      {msg}
    </div>
  );
}

export default FileUpload;
