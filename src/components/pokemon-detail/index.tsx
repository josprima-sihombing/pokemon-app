"use client";

import useGetPokemon from "@/hooks/use-get-pokemon";
import classNames from "classnames";
import { type FormEventHandler, useEffect, useState } from "react";

import css from "./pokemon-detail.module.css";
import PokeBallIcon from "../icons/poke-ball";
import { useRouter } from "next/navigation";
import useMyPokemon from "@/hooks/use-my-pokemon";
import Field from "./field";

type PokemonDetailProps = {
	id: number;
};

export default function PokemonDetail({ id }: PokemonDetailProps) {
	const { data, error, loading } = useGetPokemon(id);
	const { addPokemon } = useMyPokemon();
	const [isCatching, setIsCatching] = useState(false);
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
	const [nickName, setNickName] = useState("");

	const router = useRouter();

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const addToLocalStorage: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		addPokemon({
			id,
			name: data?.name || "",
			nickName: nickName,
		});

		router.back();
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
						<button type="button" onClick={() => router.back()}>
							Back
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
					<div className="flex-grow min-h-0 relative pt-[160px] flex flex-col">
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

						<div className="flex-grow px-4 h-full flex flex-col overflow-auto">
							<h2 className="text-center text-white uppercase text-2xl border-b border-white pb-2 mb-2">
								{data?.name}
							</h2>

							<div>
								<div className="flex gap-4 px-2 py-4">
									<Field name="Weight" value={data?.weight.toString() || "-"} />
									<Field name="Height" value={data?.height.toString() || "-"} />
								</div>

								<div className="grid grid-cols-2 gap-2 px-2 py-4">
									{data?.stats.map((stat, index) => (
										<div key={index} className="flex flex-col">
											<label
												htmlFor={stat.stat.name}
												className="text-white text-sm font-bold"
											>
												{stat.stat.name}
											</label>
											<meter
												id={stat.stat.name}
												value={stat.base_stat}
												min="0"
												max="100"
											>
												{stat.base_stat}
											</meter>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="flex gap-4 p-4 justify-end">
						<button
							type="button"
							onClick={() => router.back()}
							className="text-white border px-4 rounded-lg"
						>
							Back
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
