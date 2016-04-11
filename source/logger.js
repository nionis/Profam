//Custom logs that adds 'Profam:'
export default (...args) => {
  for (let argument of args) {
    console.log('Profam:', argument);
  }
};
