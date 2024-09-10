"use client";

import { API_ENDPOINT } from "@/constants/common";
import { useCallback, useEffect, useState } from "react";

type Pokemon = {
	name: string;
	height: number;
	weight: number;
	stats: {
		base_stat: number;
		effort: number;
		stat: {
			name: string;
		};
	}[];
	abilities: {
		ability: {
			name: "blaze";
		};
		is_hidden: boolean;
	}[];
};

export default function useGetPokemon(id: number) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Pokemon | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchPokemon = useCallback(async (signal: AbortSignal, id: number) => {
		setLoading(true);

		try {
			const response = await fetch(`${API_ENDPOINT}/${id}`, {
				signal,
			});

			if (!response.ok) {
				setError("Unknonw Error");
				return;
			}

			const pokemonResponse = await response.json();

			setData(pokemonResponse);
			setLoading(false);
		} catch (error) {
			setError("Unknown Error");
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetchPokemon(signal, id);

		return () => {
			controller.abort();
		};
	}, [id, fetchPokemon]);

	return {
		loading,
		data,
		error,
	};
}
