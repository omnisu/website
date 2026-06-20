import { Section } from "@/ui/section";
import { AuroraAtTop } from "@/widgets/aurora-at-top";
import { Header } from "@/widgets/header";

export default function Home() {
	return (
		<div>
			<section className="h-svh relative pt-24">
				<AuroraAtTop className="absolute inset-0 -z-1" />
				<Header />

				<div className="max-w-screen-2xl 2xl:mx-auto px-4">
					<h1>Egor Morozov</h1>
				</div>
			</section>

			<Section className="h-svh p-4">
				<h1>Hello</h1>
			</Section>
		</div>
	);
}
