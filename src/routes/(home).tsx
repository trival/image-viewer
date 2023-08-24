import { Match, Switch } from "solid-js"
import { useStore } from "~/components/AppContext"
import MainScreen from "~/components/screens/Main"
import StartScreen from "~/components/screens/Start"

export default function Home() {
	const [state, { openLibrary, createLibrary }] = useStore()

	return (
		<main class="p-5">
			<Switch>
				<Match when={!state.currentLibrary}>
					<StartScreen
						libraries={state.libraries}
						onSelect={openLibrary}
						onCreate={createLibrary}
					/>
				</Match>
				<Match when={state.currentLibrary}>
					<MainScreen library={state.currentLibrary!} media={[]} />
				</Match>
			</Switch>
		</main>
	)
}
