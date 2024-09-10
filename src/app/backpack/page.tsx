"use client";

import PokemonCard from "@/components/pokemon-list/card";
import useMyPokemon from "@/hooks/use-my-pokemon";

export default function MyPokemonPage() {
	const { savedPokemons, releasePokemon } = useMyPokemon();

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
