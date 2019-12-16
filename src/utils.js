export const debounce = (func, delay) => {
  let debounceTimer;

  return function () {
    const context = this;
    const args = arguments;
    
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
} 

export const shuffleArray = array => {
  return array.sort(() => Math.random() - 0.5);
}