import { GameState, NumberType } from "./enums";

export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

export const getArray = (length: number): number[] => [...Array(length).keys()];

export const getNumberItemType = (gameState: GameState): NumberType => {
  switch (gameState) {
    case GameState.NONE:
      return NumberType.START;
    case GameState.WIN:
      return NumberType.SUCCESS;
    case GameState.LOSS:
      return NumberType.FAIL;
    default:
      return NumberType.START;
  }
};