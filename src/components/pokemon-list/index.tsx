"use client";

import useGetPokemons from "@/hooks/use-get-pokemons";
import { useCallback, useEffect, useState } from "react";

export default function PokemonList() {
	const { data, error, loading, fetchNextPage } = useGetPokemons();
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
		<div className="grid grid-cols-2 gap-12">
			{data?.map((pokemon) => (
				<div key={pokemon.url} className="rounded-lg">
					<div className="w-full h-[200px]">
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
				</div>
			))}

			{!loading && <div ref={onObserverTargetRefChange} />}
		</div>
	);
}
