import { Link } from "react-router-dom";

function PageNotFound() {
  return (
      <div>
        <h2>Такой страницы не существует</h2>
        <p>
          Выход назад. <Link to="/">Назад</Link>
        </p>
      </div>
  );
}
export default PageNotFound;
