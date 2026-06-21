"use client";

import { useTheme } from "next-themes";
import { Card } from "@/ui/card";
import { Section } from "@/ui/section";
import { AuroraAtTop } from "@/widgets/aurora-at-top";
import { Header } from "@/widgets/header";

export default function Home() {
	const { setTheme } = useTheme();

	return (
		<div>
			<section className="h-svh relative pt-24">
				<AuroraAtTop className="absolute inset-0 -z-1" />
				<Header />

				<div className="max-w-screen-2xl 2xl:mx-auto px-4">
					<button type="button" onClick={() => setTheme("light")}>
						Light
					</button>
					<button type="button" onClick={() => setTheme("dark")}>
						Dark
					</button>
				</div>

				<div className="p-4 max-w-lg">
					<Card>
						<Card.Header>
							<Card.Title>Card Title</Card.Title>
							<Card.Description>Card Description</Card.Description>
							<Card.Action>Action</Card.Action>
						</Card.Header>

						<Card.Content>Card Contents</Card.Content>

						<Card.Footer>Card Footer</Card.Footer>
					</Card>
				</div>
			</section>

			<Section className="h-svh p-4">
				<h1>Hello</h1>
			</Section>
		</div>
	);
}
