import React from "react";

const HtmlRender = ({ htmlContent }) => {
   console.log('htmlContent:', htmlContent);
  if (!htmlContent || !Array.isArray(htmlContent)) {
    // Handle the case where htmlContent is not an array
    return null;
  }

  console.log('htmlContent:', htmlContent);

  return (
    <div className="html-render-container">
      {htmlContent.map((block, index) => {
        console.log(`Processing block ${index}:`, block);

        if (!block || !block.type) {
          console.error(`Invalid block at index ${index}:`, block);
          return null;
        }

        return (
          <div key={index}>
            {block.type === "paragraph" &&
              block.children.map((child, childIndex) => (
                <p key={childIndex} className="my-5">{renderText(child)}</p>
              ))}
            {block.type === "text" && !block.bold && (
              <span>{renderText(block)}</span>
            )}
            {block.type === "text" && block.bold && (
              <strong>{renderText(block)}</strong>
            )}
            {block.type === "image" && (
              <img
                src={block.url}
                alt={block.alt}
                width={block.width}
                height={block.height}
              />
            )}
            {block.type === "heading" &&
              React.createElement(
                `h${block.level}`,
                null,
                block.children.map((child, childIndex) => (
                  <span key={childIndex}>{renderText(child)}</span>
                ))
              )}
            {block.type === "code" && (
              <pre>
                <code>{block.text}</code>
              </pre>
            )}
            {block.type === "list" && (
              <ul className="list-disc list-inside mt-3 mb-5">
                {block.children.map((listItem, listItemIndex) => (
                  <li key={listItemIndex}>
                    {listItem.children.map((child, childIndex) => (
                      <span key={childIndex}>{renderText(child)}</span>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );

  function renderText(textBlock) {
    if (textBlock.link) {
      return <a href={textBlock.link}>{textBlock.text}</a>;
    }
    return textBlock.bold ? <strong>{textBlock.text}</strong> : textBlock.text;
  }
};

export default HtmlRender;
