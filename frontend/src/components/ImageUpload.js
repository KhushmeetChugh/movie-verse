import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("filename", file);

      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(result.message);
      } else {
        console.error("Error uploading file:", response.statusText);
        setUploadStatus("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setUploadStatus("Error uploading file");
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      <div>{uploadStatus}</div>
    </div>
  );
}

export default App;
