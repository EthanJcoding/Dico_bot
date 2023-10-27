// only purpose for a mock data

function getRandomNumber(min, max) {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const random = Math.random();

  // Scale the random number to the desired range [min, max]
  return Math.floor(random * (max - min + 1) + min);
}

export { getRandomNumber };
