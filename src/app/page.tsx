"use client";

import { DogIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/ui/button/button";
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
							<Card.Title>Example Card</Card.Title>
							<Card.Description>Card Description</Card.Description>
							<Card.Action>Action</Card.Action>
						</Card.Header>

						<Card.Content>Card Contents</Card.Content>

						<Card.Footer>Card Footer</Card.Footer>
					</Card>
				</div>

				<div className="p-4">
					<span>Buttons</span>

					<div className="flex flex-wrap gap-x-3 gap-y-2 max-w-lg mt-4">
						<Button variant="default">Default</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="link">Link</Button>

						<Button size="lg">Large</Button>
						<Button size="default">Default</Button>
						<Button size="sm">Small</Button>
						<Button size="xs">Extra-small</Button>
						<Button size="icon-lg">
							<DogIcon />
						</Button>
						<Button size="icon">
							<DogIcon />
						</Button>
						<Button size="icon-sm">
							<DogIcon />
						</Button>
						<Button size="icon-xs">
							<DogIcon />
						</Button>
					</div>
				</div>
			</section>

			<Section className="h-svh p-4">
				<h1>Hello</h1>
			</Section>
		</div>
	);
}
