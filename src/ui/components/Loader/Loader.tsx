export const Loader = (): JSX.Element => {
  return (
    <div className="loader__wrapper">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
