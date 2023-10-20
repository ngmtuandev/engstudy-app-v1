export default function randomNumber(count, max) {
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * max);
        randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}