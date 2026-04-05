import type { JSX } from "react";

import "@/components/Loader/Loader.css";

const Loader = (): JSX.Element => {
  return (
    <div className="loader-wrapper">
      <div className="loader-wrapper__lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
