"use client";

import useGetPokemons from "@/hooks/use-get-pokemons";
import { useCallback, useEffect, useState } from "react";
import PokemonDetail from "@/components/pokemon-detail";
import PokemonCard from "./card";

export default function PokemonList() {
	const { data, loading, fetchNextPage } = useGetPokemons();
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
					<PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
				))}

				{!loading && <div ref={onObserverTargetRefChange} />}
			</div>
		</>
	);
}
