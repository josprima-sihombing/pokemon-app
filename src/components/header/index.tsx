import Link from "next/link";
import BackpackIcon from "@/components/icons/backpack";

export default function Header() {
	return (
		<div className="bg-black text-white px-4 py-5 flex justify-between items-center">
			<Link href="/">
				<h1 className="text-lg font-bold">Pokemon</h1>
			</Link>

			<Link href="/backpack" className="flex items-center">
				<span>
					<BackpackIcon size={48} />
				</span>
			</Link>
		</div>
	);
}
