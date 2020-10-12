import React from "react";
import { Loader } from "semantic-ui-react";

function Loading() {
  return (
    <div className="loader_wrapper">
      <Loader active size="large">
        Loading
      </Loader>
    </div>
  );
}

export default Loading;
