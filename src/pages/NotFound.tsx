import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>Not found</div>
      Back to <Link to="/">home</Link>
    </>
  );
}

export default NotFound;
