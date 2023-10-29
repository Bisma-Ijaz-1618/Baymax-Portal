import { Link, Outlet } from "react-router-dom";
const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>WELCOME USER!</h1>

      <p>
        <Link to="/auth/dash/data">View Data</Link>
      </p>
      <p>
        <Link to="users">View User </Link>
        <Outlet />
      </p>
    </section>
  );

  return content;
};
export default Welcome;
