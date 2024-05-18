// FileList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/files");
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={`/${file.filename}`} download={file.filename}>
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
