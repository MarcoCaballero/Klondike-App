export enum GameMode {
    ONE_CARD_MODE= '1',
    THREE_CARD_MODE = '3',
}

export const ALL_GAME_MODES: GameMode[] = [GameMode.ONE_CARD_MODE, GameMode.THREE_CARD_MODE];

export let GetGameMode = (str: string): GameMode => {
    const filteredMode: GameMode[] =  ALL_GAME_MODES.filter((mode: string) => mode === str);
    return (filteredMode.length > 0) ? filteredMode[0] : undefined;
};
