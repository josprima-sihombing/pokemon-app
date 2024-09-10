import { useRouter } from "next/navigation";

type PokemonCardProps = {
	id: number;
	name: string;
	nickName?: string;
	actionButton?: React.ReactNode;
};

export default function PokemonCard({
	id,
	name,
	nickName,
	actionButton = null,
}: PokemonCardProps) {
	const router = useRouter();

	return (
		<div className="rounded-lg flex flex-col">
			<button type="button" onClick={() => router.push(`/${id}`)}>
				<div className="w-[140px] h-[200px] mx-auto">
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
						alt=""
						className="w-full h-full object-contain"
					/>
				</div>

				<div className="px-2 py-4">
					<span className="uppercase text-white block text-center">{name}</span>
					{nickName && (
						<span className="uppercase text-white block text-center">
							{nickName}
						</span>
					)}
				</div>
			</button>

			{actionButton}
		</div>
	);
}
