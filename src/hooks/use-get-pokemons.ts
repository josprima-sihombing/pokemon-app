"use client";

import { API_ENDPOINT } from "@/constants/common";
import { useCallback, useEffect, useState } from "react";

type Pokemon = {
	url: string;
	name: string;
};

type Pokemons = ({ id: number } & Pokemon)[];

const PER_PAGE = 10;

/**
 * Extract the id from the url:
 * Example:
 * url => https://pokeapi.co/api/v2/pokemon/1/
 * id = 1
 */
const getIdFromUrl = (url: string) => {
	const id = url.match(/pokemon\/(\d+)\//)?.[1];

	if (!id) {
		return null;
	}

	if (isNaN(Number(id))) {
		return null;
	}

	return Number(id);
};

export default function useGetPokemons() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Pokemons>([]);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	const fetchPokemons = useCallback(
		async (signal: AbortSignal, page: number) => {
			setLoading(true);

			try {
				const offset = (page - 1) * PER_PAGE;

				const response = await fetch(
					`${API_ENDPOINT}/?offset=${offset}&limit=${PER_PAGE}`,
					{
						signal,
					},
				);

				if (!response.ok) {
					setError("Unknonw Error");
					return;
				}

				const pokemonsResponse = await response.json();
				const pokemons = pokemonsResponse.results.map((pokemon: Pokemon) => ({
					id: getIdFromUrl(pokemon.url),
					name: pokemon.name,
					url: pokemon.url,
				}));

				setData(data?.concat(pokemons));
				setLoading(false);
			} catch (error) {
				setError("Unknown Error");
				setLoading(false);
			}
		},
		[data],
	);

	const fetchNextPage = useCallback(() => {
		console.log("runnn>??????");
		setPage((currentPage) => currentPage + 1);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetchPokemons(signal, page);

		return () => {
			controller.abort();
		};
	}, [page]);

	return {
		loading,
		data,
		error,
		fetchNextPage,
	};
}
