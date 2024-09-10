"use client";

import PokemonCard from "@/components/pokemon-list/card";
import useMyPokemon from "@/hooks/use-my-pokemon";

export default function MyPokemonPage() {
	const { savedPokemons, releasePokemon, loading } = useMyPokemon();

	const renderData = () => {
		if (loading) {
			return (
				<div className="p-4 text-center">
					<span className="text-white">Loading...</span>
				</div>
			);
		}

		if (savedPokemons.length === 0) {
			return (
				<div className="p-4 text-center">
					<span className="text-white">Empty</span>
				</div>
			);
		}

		return (
			<div className="grid grid-cols-2 gap-4 max-w-screen-md mx-auto">
				{savedPokemons.map((pokemon, index) => (
					<PokemonCard
						key={index}
						id={pokemon.id}
						name={pokemon.name}
						nickName={pokemon.nickName}
						actionButton={
							<button
								type="button"
								onClick={() => releasePokemon(index)}
								className="border border-red-500 px-4 py-2 rounded-lg text-white"
							>
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
			<h1 className="text-center text-white text-2xl mb-4">My Pokemon</h1>
			{renderData()}
		</div>
	);
}
