const validationRules = {
  name: 'required',
  email: 'required|email',
  password: 'required|min:8',
};

export default validationRules;
