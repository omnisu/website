import { AuroraBackground } from "@/lib/ui/aurora-background";

export default function Home() {
	return (
		<div>
			<section className="h-svh relative">
				<AuroraBackground className="absolute inset-0 -z-1" />

				<div>
					<h1>Hola</h1>
				</div>
			</section>
		</div>
	);
}
