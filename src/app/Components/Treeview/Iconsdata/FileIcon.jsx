import React from "react";
import {
  DiJavascript,
  DiCss3,
  DiHtml5,
  DiPython,
  DiJava,
  DiGo,
  DiRuby,
  DiPhp,
  DiReact,
  DiDatabase,
} from "react-icons/di";

const FileIcon = ({ filename }) => {
  const extension = filename.split(".").pop().toLowerCase(); // Extract file extension

  const icons = {
    js: <DiJavascript />,
    css: <DiCss3 />,
    html: <DiHtml5 />,
    py: <DiPython />,
    java: <DiJava />,
    go: <DiGo />,
    rb: <DiRuby />,
    php: <DiPhp />,
    tsx: <DiReact />,
    jsx: <DiReact />,
    json: <DiDatabase />,
  };

  return icons[extension] || <DiDatabase />; // Default icon if no match
};

export default FileIcon;
