export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

export const getArray = (length: number): number[] => [...Array(length).keys()];