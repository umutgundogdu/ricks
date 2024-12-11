import { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "@/graphql/queries";
import { Character } from "@/types";
import { useDebounce, useSelectedCharacters, useSelectedCharactersActions } from "@/hooks";

export function useMultiSelectLogic() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const selectedCharacters = useSelectedCharacters();
    const { addCharacter, removeCharacter } = useSelectedCharactersActions();

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedQuery = useDebounce(query, 300);

    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { query: debouncedQuery },
        skip: !debouncedQuery,
    });

    const results =
        data?.characters?.results?.filter(
            (character: Character) => !selectedCharacters.some((selectedChar) => selectedChar.id === character.id)
        ) || [];

    const handleSelect = (character: Character) => {
        if (!selectedCharacters.find((c) => c.id === character.id)) {
            addCharacter(character);
        }
        setQuery("");
        inputRef.current?.focus();
    };

    const handleRemove = (characterId: number) => {
        removeCharacter(characterId);
        inputRef.current?.focus();
    };

    const handleInputFocus = () => setIsOpen(true);

    const handleInputBlur = (e: React.FocusEvent) => {
        if (containerRef.current?.contains(e.relatedTarget as Node)) return;
        setIsOpen(false);
    };

    return {
        query,
        setQuery,
        isOpen,
        setIsOpen,
        activeIndex,
        setActiveIndex,
        containerRef,
        inputRef,
        loading,
        error,
        results,
        handleSelect,
        handleRemove,
        handleInputFocus,
        handleInputBlur,
    };
}
