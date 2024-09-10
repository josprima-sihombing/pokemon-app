import { POKEMON_STORAGE_KEY } from "@/constants/common";
import { useCallback, useEffect, useState } from "react";

type SavedPokemon = {
	id: number;
	name: string;
	nickName: string;
};

const getSavedPokemons = (): SavedPokemon[] => {
	if (typeof window === "undefined") {
		return [];
	}

	const savedPokemons = window.localStorage.getItem(POKEMON_STORAGE_KEY);

	if (!savedPokemons) {
		return [];
	}

	const items = savedPokemons.split(";");

	return items.map((item) => {
		const data = item.split(",");

		return {
			id: Number(data[0]),
			name: data[1],
			nickName: data[2],
		};
	});
};

export default function useMyPokemon() {
	const [loading, setLoading] = useState(true);

	const [savedPokemons, setSavedPokemons] = useState<SavedPokemon[]>([]);

	const saveToLocalStorage = useCallback((pokemons: SavedPokemon[]) => {
		const items = pokemons.map(
			(pokemon) => `${pokemon.id},${pokemon.name},${pokemon.nickName}`,
		);

		window.localStorage.setItem(POKEMON_STORAGE_KEY, items.join(";"));
	}, []);

	const releasePokemon = (selectedIndex: number) => {
		const newSavedPokemons = [...savedPokemons].filter(
			(_, index) => index !== selectedIndex,
		);

		setSavedPokemons(newSavedPokemons);
		saveToLocalStorage(newSavedPokemons);
	};

	const addPokemon = (pokemon: SavedPokemon) => {
		const newSavedPokemons = savedPokemons.concat([pokemon]);
		saveToLocalStorage(newSavedPokemons);
	};

	useEffect(() => {
		const savedPokemons = getSavedPokemons();
		setSavedPokemons(savedPokemons);
		setLoading(false);
	}, []);

	return {
		savedPokemons,
		releasePokemon,
		addPokemon,
		loading,
	};
}
