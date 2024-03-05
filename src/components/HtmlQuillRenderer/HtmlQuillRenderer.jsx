import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const HtmlQuillRenderer = ({ content, onContentChange, readOnly }) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleQuillChange = (value) => {
    setEditedContent(value);
    onContentChange(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  return (
    <div>
      {readOnly ? (
        <div>
          {/* Render mode */}
          {Array.isArray(content) &&
            content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h3 key={index} style={{ fontWeight: "bold" }}>
                    {block.children.map((textBlock, i) => (
                      <span key={i}>{textBlock.text}</span>
                    ))}
                  </h3>
                );
              } else if (block.type === "paragraph") {
                return (
                  <p key={index}>
                    {block.children.map((textBlock, i) => (
                      <span key={i}>{textBlock.text}</span>
                    ))}
                  </p>
                );
              }
              // Add more cases for other block types if needed
              return null;
            })}
        </div>
      ) : (
        <div>
          {/* Edit mode */}
          <ReactQuill
            value={editedContent}
            onChange={handleQuillChange}
            modules={modules}
          />
        </div>
      )}
    </div>
  );
};

export default HtmlQuillRenderer;
