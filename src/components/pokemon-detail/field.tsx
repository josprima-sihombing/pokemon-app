type FieldProps = {
	name: string;
	value: string;
};

export default function Field({ name, value }: FieldProps) {
	return (
		<div className="flex flex-col">
			<span className="text-white text-sm font-bold">{name}</span>
			<span className="text-white text-xl">{value}</span>
		</div>
	);
}
