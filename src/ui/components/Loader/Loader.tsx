import "@src/ui/components/Loader/Loader.css";

export const Loader = (): JSX.Element => {
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
