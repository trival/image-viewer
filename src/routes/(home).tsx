import { Show, createResource } from "solid-js"
import { trpcClient } from "~/libs/trpc-client"

export default function Home() {
	const [fufu] = createResource({ text: "fufu" }, (payload) =>
		trpcClient.hello.query(payload),
	)

	return (
		<main class="p-5">
			<Show when={!fufu.loading} fallback={<p>...loading</p>}>
				hello: {fufu()!.greeting}
			</Show>
		</main>
	)
}
