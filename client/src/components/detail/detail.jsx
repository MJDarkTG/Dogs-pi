import style from "./Detail.module.css";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, clearDetail } from "../../reducer/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);

  const details = detail[0]?.temperament.map((t) =>
    t.name ? t.name + " , " : t + " , "
  );

  return (
    <div className={style.container}>
      <button className={style.buttonVolver}>
        <Link to="/home">VOLVER </Link>
      </button>
      <div className={style.card}>
        <div className={style.detaills}>
          <h1 className={style.name}>{detail[0]?.name}</h1>
          <ul className={style.info}>
            <li><strong>Peso:</strong> {detail[0]?.weight.map((e) => e + " libras ")}</li>
            <li><strong>Altura:</strong> {detail[0]?.height.map((e) => e + " cmt ")}</li>
            <li><strong>Esperanza de vida:</strong> {detail[0]?.life_span}</li>
            <li><strong>Temperamentos:</strong> {details}</li>
          </ul>
          <img src={detail[0]?.image} className={style.image} alt="img no disponible"/>
        </div>
      </div>
    </div>



  );
};

export default Detail;
