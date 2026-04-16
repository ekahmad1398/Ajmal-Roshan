import React from "react";

const Upload = ({ onFileUpload }) => {
  return (
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={(e) => onFileUpload(e.target.files[0])}
    />
  );
};

export default Upload;