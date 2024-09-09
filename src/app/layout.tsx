import { primaryFont } from "@/fonts";
import classNames from "classnames";
import Header from "@/components/header";
import "./globals.css";

export const metadata = {
	title: "Pokemon",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={classNames(primaryFont.className, "h-full")}>
			<body className="flex flex-col h-full">
				<Header />
				<main className="flex-grow">{children}</main>
			</body>
		</html>
	);
}
