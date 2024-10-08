import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type PokemonCardProps = {
	id: number;
	name: string;
	nickName?: string;
	actionButton?: React.ReactNode;
};

const imagePlaceholder = "/images/placeholder.svg";

export default function PokemonCard({
	id,
	name,
	nickName,
	actionButton = null,
}: PokemonCardProps) {
	const router = useRouter();
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (!imageRef.current) {
			return;
		}

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					return;
				}

				const imageSrc = entry.target.getAttribute("src") || "";

				if (imageSrc !== imagePlaceholder) {
					return;
				}

				const image = new Image();

				image.src = entry.target.getAttribute("data-src") || "";

				image.onload = () => {
					entry.target.setAttribute("src", image.src);
				};
			}
		}, {});

		observer.observe(imageRef.current);

		return () => {
			if (!imageRef.current) {
				return;
			}

			observer.unobserve(imageRef.current);
		};
	}, []);

	return (
		<div className="rounded-lg flex flex-col bg-slate-700 p-4">
			<button type="button" onClick={() => router.push(`/${id}`)}>
				<div className="w-[140px] h-[200px] max-w-full mx-auto">
					<img
						src={imagePlaceholder}
						data-src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
						alt=""
						className="w-full h-full object-contain"
						ref={imageRef}
					/>
				</div>

				<div className="px-2 py-4">
					<span className="uppercase text-white block text-center">{name}</span>
					{nickName && (
						<span className="text-white block text-center">{`(${nickName})`}</span>
					)}
				</div>
			</button>

			{actionButton}
		</div>
	);
}
