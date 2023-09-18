import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileDropZone = ({ onFileSelected, photo }) => {
  const [dropped, setDropped] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    setDropped(true);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelected(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreviewUrl(reader.result);
    } else {
      setPreviewUrl(undefined);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        p: 1,
        cursor: "pointer",
        minHeight: "100px",
        width: `${dropped && "316px"}`,
        m: 2,
      }}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxHeight: "50px", maxWidth: "100px" }}
        />
      ) : isDragActive ? (
        <p>{"Drop the file here ..."}</p>
      ) : (
        <p>
          {dropped ? "Selected " : !photo ? "Cover Photo" : "Profile Photo"}
        </p>
      )}
    </Box>
  );
};

export default FileDropZone;
