import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, image, name, temperaments }) => {
  const temper = temperaments.map((t) => t + ", ");
  console.log(temper);
  return (
    
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
    </div>


  );
};

export default Card;
