export const Loader = (): JSX.Element => {
  return (
    <div className="loader_wrapper">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
