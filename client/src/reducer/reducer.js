import {
  CLEAR_DETAIL,
  GET_ALL_DOGS,
  GET_DETAIL,
  GET_DOG,
  GET_FILTER_TEMPER,
  GET_TEMPER,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
} from "./types/types";

const initialState = {
  dogs: [],
  detail: [],
  temperaments: [],
  allDogs: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOGS:
      // console.log(payload);
      payload.forEach((dog) => {
        // console.log(dog.temperament);
        if (!dog.temperament) {
          dog.temperament = "no hay temperamentos"; // si no hay temper les agrego el message adecuado
          // console.log(dog.temperaments);
        }
      });
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
      };

    case GET_TEMPER:
      const limpiarTemper = payload.filter((temper) => temper.name !== ""); //elimino tempers que tiene el name vacio
      return {
        ...state,
        temperaments: limpiarTemper,
      };

    case GET_FILTER_TEMPER:
      const allDogs = state.allDogs;
      let filterDogs = [];
      if (payload === "Todos") {
        filterDogs = allDogs;
      } else {
        for (let i = 0; i < allDogs.length; i++) {
          let encontro = allDogs[i].temperament.find((t) => t === payload);
          if (encontro) {
            filterDogs.push(allDogs[i]);
          }
        }
      }
      return {
        ...state,
        dogs: filterDogs,
      };

    case GET_DOG:
      return {
        ...state,
        dogs: payload,
      };

    case ORDER_BY_NAME:
      const ordenarName =
        payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: ordenarName,
      };

    case ORDER_BY_WEIGHT:
      const ordenarWeight =
        payload === "min_weight"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: ordenarWeight,
      };

    case GET_DETAIL:
      let Details = payload;
      // console.log(payload);
      if (!Details[0].temperaments) {
        //agrego string a arr sin elemts dentro
        Details[0].temperaments = "no hay temperamentos";
      }
      return {
        ...state,
        detail: Details,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        detail: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
