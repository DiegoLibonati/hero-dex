import "@src/components/CheckingAuth/CheckingAuth.css";

export const CheckingAuth = (): JSX.Element => {
  return (
    <div className="loader-auth-checking">
      <img
        src="https://i.pinimg.com/originals/a9/78/09/a97809ed54944ec8bb6e3940cd0bc513.gif"
        alt="gif loading"
        className="loader-auth-checking__img"
      ></img>
    </div>
  );
};
