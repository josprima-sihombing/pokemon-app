import useGetPokemon from "@/hooks/use-get-pokemon";
import classNames from "classnames";
import { useEffect } from "react";

import css from "./pokemon-detail.module.css";
import PokeBallIcon from "../icons/poke-ball";

type PokemonDetailProps = {
	id: number;
	onClose: () => void;
};

export default function PokemonDetail({ id, onClose }: PokemonDetailProps) {
	const { data, error, loading } = useGetPokemon(id);

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 w-full h-full z-50 pt-24 backdrop-blur-sm">
			<div
				className={classNames(
					css.detail,
					"h-full bg-slate-800 rounded-t-3xl pt-8 flex flex-col",
				)}
			>
				<div className="flex-grow overflow-auto">
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
						alt=""
						className="w-[300px] h-[300px] object-contain block mx-auto"
					/>
				</div>

				<div className="flex gap-4 p-4">
					<button type="button" onClick={onClose} className="flex-grow">
						Close
					</button>

					<button
						type="button"
						className={classNames(css.catchButton, "flex-grow-[3] justify-center")}
					>
						<PokeBallIcon />
						<span>Catch</span>
					</button>
				</div>
			</div>
		</div>
	);
}
