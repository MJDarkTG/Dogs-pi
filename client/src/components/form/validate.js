const validate = (form) => {
  let errors = {};
  if (!form.name) {
    errors.name = "nombre es requerido";
  }
  if (!form.max_height) {
    errors.max_height = "altura max es requerida";
  }
  if (!form.min_height) {
    errors.min_height = "altura min es requerida";
  }
  if (!form.max_weight) {
    errors.max_weight = "Peso max es requerido";
  }
  if (!form.min_weight) {
    errors.min_weight = "peso min es requerido";
  }
  if (!form.life_span) {
    errors.life_span = "esperanza de vida requerida";
  }
  return errors;
};

export default validate;
