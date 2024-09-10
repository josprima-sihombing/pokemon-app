type PokemonCardProps = {
	id: number;
	name: string;
	onClick?: () => void;
	nickName?: string;
	actionButton?: React.ReactNode;
};

export default function PokemonCard({
	id,
	name,
	nickName,
	onClick,
	actionButton = null,
}: PokemonCardProps) {
	return (
		<button type="button" key={id} className="rounded-lg" onClick={onClick}>
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

			{actionButton}
		</button>
	);
}
