export interface Character {
    id: number;
    name: string;
    image: string;
    episode: { id: string }[];
}

export interface MultiSelectProps {
    value: Character[];
    onChange: (characters: Character[]) => void;
    placeholder?: string;
}
