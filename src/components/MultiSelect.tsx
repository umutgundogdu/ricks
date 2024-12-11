import { MultiSelectProps } from "@/types";
import { useMultiSelectLogic, useKeyboard, useSelectedCharacters } from "@/hooks";
import { MultiSelectTag, MultiSelectResults } from "@/components";
import styles from "./MultiSelect.module.css";

export function MultiSelect({ placeholder = "Search..." }: Omit<MultiSelectProps, "value" | "onChange">) {
    const selectedCharacters = useSelectedCharacters();

    const {
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
    } = useMultiSelectLogic();

    useKeyboard({
        containerRef,
        inputRef,
        isOpen,
        activeIndex,
        setActiveIndex,
        results,
        onSelect: handleSelect,
        onRemove: handleRemove,
        selectedItems: selectedCharacters,
    });

    const highlightText = (text: string) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={i} className={styles.highlight}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div ref={containerRef} className={styles.container} onBlur={handleInputBlur} tabIndex={-1}>
            <div className={styles.inputContainer}>
                {selectedCharacters.map((character) => (
                    <MultiSelectTag key={character.id} character={character} onRemove={handleRemove} />
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={handleInputFocus}
                    placeholder={placeholder}
                />
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    <MultiSelectResults
                        loading={loading}
                        error={error}
                        results={results}
                        activeIndex={activeIndex}
                        query={query}
                        onSelect={handleSelect}
                        highlightText={highlightText}
                    />
                </div>
            )}
        </div>
    );
}
