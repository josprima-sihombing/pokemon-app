import PokemonDetail from "@/components/pokemon-detail";

export default function PokemonDetailPage({
	params,
}: { params: { id: string } }) {
	return (
		<div>
			<h1>Detail page</h1>
			<PokemonDetail id={Number(params.id)} />
		</div>
	);
}
