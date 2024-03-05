/// uploadfile.jsx
import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import { useToast } from "../../hooks/useToast";
import { formatBytes } from "../../helpers/helpers";
import { Spinner } from "react-bootstrap";

const FileUpload = ({ onFileChange, multiple = false, loading }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const toast = useToast();

  const handleFileChange = (event) => {
    const files = event.target.files;

    // Reset the uploadSuccess state for each file
    setUploadSuccess(false);

    // If multiple uploads are allowed, concatenate the new files with the existing ones
    // Otherwise, replace the existing files with the new ones
    setSelectedFiles((prevFiles) =>
      multiple ? [...prevFiles, ...files] : [...files]
    );
    // Notify the parent component about the selected file
    // if (files.length > 0) {
    //   onFileChange(files[0]); // Assuming you only want the first file if multiple uploads are not allowed
    // }
    
    // Notify the parent component about the selected files
    onFileChange(multiple ? [...selectedFiles, ...files] : files);

  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async (file) => {
    console.log("Uploading file:", file);
    const maxSize = 1 * 1024 * 1024; // 1 MB limit
    if (file.size > maxSize) {
      setUploadError("File size exceeds the limit (1MB)");
      toast.error("File size exceeds the limit (1MB)");
      return;
    }

    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(false);
    setUploading(true);

    // Simulate upload progress
    const totalSteps = 10;
    const stepDuration = 1000;

    for (let step = 1; step <= totalSteps; step++) {
      await new Promise((resolve) => setTimeout(resolve, stepDuration));

      // Simulate successful upload or error
      if (step === totalSteps) {
        // Simulate success
        setUploadSuccess(true);
        toast.success("File successfully uploaded!");
      }

      const progress = (step / totalSteps) * 100;
      setUploadProgress(progress);
    }

    // Simulate successful upload
    setUploadSuccess(true);

    // Notify the parent component about the uploaded file only if the upload is successful
    if (uploadSuccess) {
      onFileChange(file);
    }
    setUploading(false);
    console.log("File upload completed");
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple={multiple}
        className="form-control"
      />
      {selectedFiles.length > 0 && (
        <div className="mt-2">
          <div className="row">
            <div className="col-sm-6">
              <p className="text-muted mb-2">
                <small>Selected Files:</small>
              </p>
            </div>
            <div className="col-sm-6">
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="d-flex align-items-center">
                  <div className="text-muted me-2">
                    <small>Uploading: {uploadProgress.toFixed(2)}%</small>
                  </div>
                  <div className="col">
                    <ProgressBar
                      variant="success"
                      size="xs"
                      now={uploadProgress.toFixed(2)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <ListGroup variant="flush">
            {selectedFiles.map((file, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center gap-3"
              >
                <img
                  src={URL.createObjectURL(file)}
                  className="rounded-circle flex-shrink-0"
                  width={32}
                  height={32}
                />
                <div className="col text-truncate">{file.name}</div>
                <small>Size: {formatBytes(file.size)}</small>
                <div className="btn-group btn-group-xs">
                  <button
                    type="button"
                    onClick={() => handleUpload(file)}
                    disabled={uploadSuccess}
                    className="btn btn-light"
                  >
                    {uploading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <IconUpload size={16} stroke={1} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFile(index)}
                    className="btn btn-light"
                  >
                    <IconTrash size={16} stroke={1} />
                  </button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
      {uploadError && <p>Error: {uploadError}</p>}
    </div>
  );
};

export default FileUpload;
