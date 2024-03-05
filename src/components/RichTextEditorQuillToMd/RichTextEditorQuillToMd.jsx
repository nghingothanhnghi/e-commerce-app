import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import htmlToMd from 'html-to-md';

const RichTextEditorQuillToMd = ({ value: propValue, onChange, onConvert, readOnly, disabled }) => {
  const [value, setValue] = useState(propValue || ''); // Initialize with propValue if available
  const quillRef = useRef(null);

  useEffect(() => {
    // Update Quill editor content only if propValue changes
    if (quillRef.current && propValue !== value) {
      const quill = quillRef.current.getEditor();
      quill.clipboard.dangerouslyPasteHTML(propValue);
    }

    // Convert HTML to Markdown and trigger the onConvert callback
    const markdownContent = htmlToMd(propValue);
    onConvert && onConvert(markdownContent);
  }, [propValue, value, onConvert]);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    onChange && onChange(content);
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={handleChange}
        theme="snow"
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export default RichTextEditorQuillToMd;
