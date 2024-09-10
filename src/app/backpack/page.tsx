"use client";

import PokemonCard from "@/components/pokemon-list/card";
import { POKEMON_STORAGE_KEY } from "@/constants/common";
import { useState } from "react";

type SavedPokemons = {
	id: number;
	name: string;
	nickName: string;
}[];

const getSavedPokemons = (): SavedPokemons => {
	const savedPokemons = localStorage.getItem(POKEMON_STORAGE_KEY);

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

export default function MyPokemonPage() {
	const [savedPokemons, setSavedPokemons] =
		useState<SavedPokemons>(getSavedPokemons);

	const saveToLocalStorage = (pokemons: SavedPokemons) => {
		const items = pokemons.map(
			(pokemon) => `${pokemon.id},${pokemon.name},${pokemon.nickName}`,
		);

		localStorage.setItem(POKEMON_STORAGE_KEY, items.join(";"));
	};

	const releasePokemon = (selectedIndex: number) => {
		const newSavedPokemons = [...savedPokemons].filter(
			(_, index) => index !== selectedIndex,
		);

		setSavedPokemons(newSavedPokemons);
		saveToLocalStorage(newSavedPokemons);
	};

	const renderData = () => {
		if (savedPokemons.length === 0) {
			return (
				<div>
					<span>Empty</span>
				</div>
			);
		}

		return (
			<div className="grid grid-cols-2 gap-12 max-w-screen-md mx-auto">
				{savedPokemons.map((pokemon, index) => (
					<PokemonCard
						key={index}
						id={pokemon.id}
						name={pokemon.name}
						nickName={pokemon.nickName}
						actionButton={
							<button type="button" onClick={() => releasePokemon(index)}>
								Release
							</button>
						}
					/>
				))}
			</div>
		);
	};

	return (
		<div className="h-full p-4 bg-slate-800">
			<h1>My Pokemon</h1>
			{renderData()}
		</div>
	);
}
