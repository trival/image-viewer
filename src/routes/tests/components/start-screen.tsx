import { createSignal } from "solid-js"
import { Library } from "~/backend/interfaces"
import StartScreen from "~/components/screens/Start"

export default function StartScreenText() {
	const [libraries, setLibraries] = createSignal<Library[]>([])
	return (
		<StartScreen
			libraries={libraries()}
			onSelect={(rootPath) => console.log(rootPath)}
			onCreate={(input) =>
				setLibraries((libs) => [
					...libs,
					{ ignorePaths: [], name: input.name, rootPath: input.rootPath },
				])
			}
		/>
	)
}
