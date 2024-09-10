import useGetPokemon from "@/hooks/use-get-pokemon";
import classNames from "classnames";
import { type FormEventHandler, useEffect, useState } from "react";

import css from "./pokemon-detail.module.css";
import PokeBallIcon from "../icons/poke-ball";
import { POKEMON_STORAGE_KEY } from "@/constants/common";

type PokemonDetailProps = {
	id: number;
	onClose: () => void;
};

export default function PokemonDetail({ id, onClose }: PokemonDetailProps) {
	const { data, error, loading } = useGetPokemon(id);
	const [isCatching, setIsCatching] = useState(false);
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
	const [nickName, setNickName] = useState("");

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const addToLocalStorage: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const current = localStorage.getItem(POKEMON_STORAGE_KEY);

		if (!current) {
			localStorage.setItem(
				POKEMON_STORAGE_KEY,
				`${id},${data?.name},${nickName}`,
			);
		} else {
			// Append to previously saved separate by ;
			localStorage.setItem(
				POKEMON_STORAGE_KEY,
				`${current};${id},${data?.name},${nickName}`,
			);
		}

		onClose();
	};

	const catchPokemon = () => {
		setIsCatching(true);

		const success = Math.round(Math.random());

		if (success) {
			setIsSuccess(true);
		} else {
			setIsSuccess(false);
		}
	};

	const renderResult = () => {
		if (isSuccess === null) {
			return null;
		}

		if (isSuccess) {
			return (
				<form onSubmit={addToLocalStorage}>
					<input
						type="text"
						value={nickName}
						onChange={(e) => setNickName(e.target.value)}
					/>
					<button type="submit">Save</button>
				</form>
			);
		}

		return (
			<div>
				<p>Failed</p>
			</div>
		);
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full z-50 pt-24 backdrop-blur-xl">
			{isCatching ? (
				<div
					className={classNames(
						css.detail,
						"h-full bg-slate-800 rounded-t-3xl pt-8 flex flex-col",
					)}
				>
					Battle area with ball animation
					{renderResult()}
					<div className="flex gap-4 p-4 mt-auto justify-center">
						<button type="button" onClick={onClose}>
							Close
						</button>
					</div>
				</div>
			) : (
				<div
					className={classNames(
						css.detail,
						"h-full bg-slate-800 rounded-t-3xl pt-8 flex flex-col",
					)}
				>
					<div className="flex-grow relative">
						<div className="w-[240px] h-[240px] absolute top-[-90px] left-1/2 -translate-x-1/2">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
								alt=""
								className={classNames(
									"w-full h-full object-contain block transition-transform",
								)}
								loading="lazy"
							/>
						</div>
					</div>

					<div className="flex gap-4 p-4 justify-end">
						<button type="button" onClick={onClose}>
							Close
						</button>

						<button
							type="button"
							onClick={catchPokemon}
							className={classNames(css.catchButton, "justify-center")}
						>
							<PokeBallIcon />
							<span>Catch</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
