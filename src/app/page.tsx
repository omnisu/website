import { AuroraAtTop } from "@/widgets/aurora-at-top";
import { Header } from "@/widgets/header";

export default function Home() {
	return (
		<div>
			<section className="h-svh relative">
				<AuroraAtTop />

				<Header />
			</section>

			<section className="h-svh" />
		</div>
	);
}
