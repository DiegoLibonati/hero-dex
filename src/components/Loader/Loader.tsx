import "@/components/Loader/Loader.css";

const Loader = () => {
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
