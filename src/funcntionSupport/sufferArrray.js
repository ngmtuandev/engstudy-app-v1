export const sufferArrray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
    
        // Swap elements at indexes i and j
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
  }