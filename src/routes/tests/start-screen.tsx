import StartScreen from "~/components/screens/Start"

export default function StartScreenText() {
	return (
		<StartScreen
			libraries={[]}
			onSelect={(rootPath) => console.log(rootPath)}
			onCreate={(input) => console.log(input)}
		/>
	)
}
