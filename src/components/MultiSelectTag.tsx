import { Character } from "@/types";
import styles from "./MultiSelect.module.css";

interface MultiSelectTagProps {
    character: Character;
    onRemove: (id: number) => void;
}

export function MultiSelectTag({ character, onRemove }: MultiSelectTagProps) {
    return (
        <div className={styles.tag}>
            <img src={character.image} alt={character.name} className={styles.tagImage} />
            <span>{character.name}</span>
            <button onClick={() => onRemove(character.id)} tabIndex={0}>
                &times;
            </button>
        </div>
    );
}
