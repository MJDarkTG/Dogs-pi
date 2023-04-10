import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../reducer/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchDog, setSearchDog] = useState("");

  const handleInput = (event) => {
    setSearchDog(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getName(searchDog));
  };

  //para la tecla enter
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      dispatch(getName(searchDog));
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInput}
        placeholder="RAZA DEL PERRITO"
        className={style.input}
        onKeyDown={handleEnter}
      />
      <button type="submit" onClick={handleSubmit} className={style.button}>
        BUSCAR
      </button>
    </div>
  );
};

export default SearchBar;
