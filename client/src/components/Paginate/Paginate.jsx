import style from "./Paginate.module.css";

const Paginate = ({ perrosPorPagina, allDogs, paginado }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / perrosPorPagina); i++) {
    //cantidad de elementos totales, dividido limite de elementos por pagina
    pageNumbers.push(i);
  }

  return (
    <ul className={style.Ul}>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div
            onClick={() => paginado(number)}
            key={number}
            className={style.div}
          >
            <button className={style.button}>{number}</button>
          </div>
        ))}
    </ul>
  );
};

export default Paginate;
