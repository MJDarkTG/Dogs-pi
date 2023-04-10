import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import { getAllDogs, getTemper } from "../../reducer/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Landing = () => {
  const dispatch = useDispatch();
  //para que la pagina sea mas rapida add el effect en el landing
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemper());
  }, [dispatch]);

  return (
    <div className={style.cajaMayor}>
      <div className={style.cajaIntermedia}>
        <div className={style.caja}>
          <h1 className={style.titulo}>
          ¡Los perritos nos alegran el día!
          </h1>

          <div className={style.text}>
            <h3>
            En nuestra página de perros, encontrarás información completa sobre las razas más populares de perros en todo el mundo. 
            </h3>
          </div>
          <button className={style.button}>
            <Link to="/home">Ingresar Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
