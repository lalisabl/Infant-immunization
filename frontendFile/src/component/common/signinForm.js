import "./signin.css";

const SigninForm = ({ close }) => {
  return (
    <div onClick={close} className="modal transp">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="signin"
      >
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="form-group">
            <button className="btn primary" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
