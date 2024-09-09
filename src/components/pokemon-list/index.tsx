"use client";

import useGetPokemons from "@/hooks/use-get-pokemons";
import { useCallback, useEffect, useState } from "react";
import PokemonDetail from "@/components/pokemon-detail";

export default function PokemonList() {
	const { data, error, loading, fetchNextPage } = useGetPokemons();
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [observerTarget, setObserverTarget] = useState<HTMLDivElement | null>(
		null,
	);

	useEffect(() => {
		if (!observerTarget) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage();
				}
			},
			{ threshold: 1 },
		);

		if (observerTarget) {
			observer.observe(observerTarget);
		}

		return () => {
			if (observerTarget) {
				observer.unobserve(observerTarget);
			}
		};
	}, [observerTarget, fetchNextPage]);

	const onObserverTargetRefChange = useCallback((node: HTMLDivElement) => {
		setObserverTarget(node);
	}, []);

	return (
		<>
			<div className="grid grid-cols-2 gap-12 max-w-screen-md mx-auto">
				{data?.map((pokemon) => (
					<button
						type="button"
						key={pokemon.url}
						className="rounded-lg"
						onClick={() => setSelectedId(pokemon.id)}
					>
						<div className="w-[140px] h-[200px] mx-auto">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
								alt=""
								className="w-full h-full object-contain"
							/>
						</div>

						<div className="px-2 py-4">
							<span className="uppercase text-white block text-center">
								{pokemon.name}
							</span>
						</div>
					</button>
				))}

				{!loading && <div ref={onObserverTargetRefChange} />}
			</div>

			{selectedId && (
				<PokemonDetail id={selectedId} onClose={() => setSelectedId(null)} />
			)}
		</>
	);
}
