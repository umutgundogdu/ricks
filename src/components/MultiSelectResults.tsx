import { Character } from "@/types";
import styles from "./MultiSelect.module.css";

interface MultiSelectResultsProps {
    loading: boolean;
    error?: Error;
    results: Character[];
    activeIndex: number;
    query: string;
    onSelect: (character: Character) => void;
    highlightText: (text: string) => React.ReactNode;
}

export function MultiSelectResults({
    loading,
    error,
    results,
    activeIndex,
    query,
    onSelect,
    highlightText,
}: MultiSelectResultsProps) {
    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>An error occurred: {error.message}</div>;
    if (!results.length && query) return <div className={styles.noResults}>No results found</div>;

    return (
        <ul className={styles.resultsList}>
            {results.map((character: Character, index: number) => (
                <li
                    key={character.id}
                    className={`${styles.resultItem} ${index === activeIndex ? styles.active : ""}`}
                    onClick={() => onSelect(character)}
                    tabIndex={0}
                >
                    <img src={character.image} alt={character.name} />
                    <div className={styles.characterInfo}>
                        <strong>{highlightText(character.name)}</strong>
                        <span className={styles.episodeCount}>Appeared in {character.episode.length} episodes</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}
