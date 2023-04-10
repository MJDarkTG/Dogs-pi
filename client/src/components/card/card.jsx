import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, image, name, temperaments }) => {
  const temper = temperaments.map((t) => t + ", ");
  console.log(temper);
  return (
    // <div className={style.caja}>
    //   <Link to={`/detail/${id}`}>
    //     <h3 className={style.name}>{name}</h3>

    //     <img src={image} alt={name} className={style.image} />
    //   </Link>
    //   <div className={style.titulo}>Temperaments</div>
    //   <h4 className={style.temper}>{temper}</h4>
    // </div>
    <div className={style.card}>
      <div className={style.detaills}>
        <Link to={`/detail/${id}`}>
          <h1 className={style.name}>{name}</h1>
          <img src={image} alt={name} className={style.image} />
        </Link>
        <ul className={style.info}>
          <li><strong>Temperamentos:</strong> {temper}</li>
        </ul>
      </div>
    </div >


  );
};

export default Card;
