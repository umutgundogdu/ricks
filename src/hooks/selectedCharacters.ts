import { atom, useAtomValue, useSetAtom } from "jotai";
import { Character } from "@/types";

export const selectedCharactersAtom = atom<Character[]>([]);

export function useSelectedCharacters() {
    return useAtomValue(selectedCharactersAtom);
}

export function useSetSelectedCharacters() {
    return useSetAtom(selectedCharactersAtom);
}

export function useSelectedCharactersActions() {
    const setSelectedCharacters = useSetAtom(selectedCharactersAtom);

    const addCharacter = (character: Character) => {
        setSelectedCharacters((prev) => [...prev, character]);
    };

    const removeCharacter = (characterId: number) => {
        setSelectedCharacters((prev) => prev.filter((c) => c.id !== characterId));
    };

    return {
        addCharacter,
        removeCharacter,
    };
}
