import { useEffect } from "react";
import { Character } from "@/types";

interface UseKeyboardProps {
    containerRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    isOpen: boolean;
    activeIndex: number;
    setActiveIndex: (index: number | ((prev: number) => number)) => void;
    results: Character[];
    onSelect: (item: Character) => void;
    onRemove: (id: number) => void;
    selectedItems: Character[];
}

export function useKeyboard({
    containerRef,
    inputRef,
    isOpen,
    activeIndex,
    setActiveIndex,
    results,
    onSelect,
    onRemove,
    selectedItems,
}: UseKeyboardProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    if (!isOpen) return;
                    setActiveIndex((prev: number) => (prev < results.length - 1 ? prev + 1 : prev));
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    if (!isOpen) return;
                    setActiveIndex((prev: number) => (prev > 0 ? prev - 1 : prev));
                    break;

                case "Enter":
                    e.preventDefault();
                    if (isOpen && activeIndex >= 0) {
                        onSelect(results[activeIndex]);
                    }
                    break;

                case "Backspace":
                    if (inputRef.current?.value === "" && selectedItems.length > 0) {
                        onRemove(selectedItems[selectedItems.length - 1].id);
                    }
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, activeIndex, results, selectedItems, onSelect, onRemove, setActiveIndex]);
}
