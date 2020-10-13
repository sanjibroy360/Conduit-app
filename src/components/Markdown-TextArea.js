import React from "react";
import ReactDOM from "react-dom";
import MEDitor from "@uiw/react-md-editor";

export default function TextArea({value, name, handleChange}) {
  const [value, setValue] = React.useState("");
  return (
    <div className="editor_wrapper">
      <MEDitor name={name} height={200} value={value} onChange={handleChange}  />
      <div style={{ padding: "50px 0 0 0" }} />
    </div>
  );
}
