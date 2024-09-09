"use client";

import { API_ENDPOINT } from "@/constants/common";
import { useCallback, useEffect, useState } from "react";

type Pokemons = {
	url: string;
	name: string;
}[];

const PER_PAGE = 10;

export default function useGetPokemons() {
	const [loading, setLoading] = useState(false);
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

				setData(data?.concat(pokemonsResponse.results));
				setLoading(false);
			} catch (error) {
				setError("Unknown Error");
				setLoading(false);
			}
		},
		[data],
	);

	const fetchNextPage = useCallback(() => {
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
