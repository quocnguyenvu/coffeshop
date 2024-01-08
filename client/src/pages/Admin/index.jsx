import { Navigate, Outlet } from "react-router-dom";

export const AdminPage = () => {
  const isAuth = true;

  return isAuth ? (
    <main>
      <header>Header</header>
      <article className="navbar">Sidebar</article>
      <section>
        <Outlet />
      </section>
      <footer>Footer</footer>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};
