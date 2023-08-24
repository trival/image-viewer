import { Library, Media } from "~/backend/interfaces"

interface Props {
	library: Library
	media: Media[]
}
export default function MainScreen(props: Props) {
	return (
		<div>
			Selected Lib: <b>{props.library.name}</b>{" "}
			<small>{props.library.rootPath}</small>
		</div>
	)
}
