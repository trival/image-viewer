import clsx from "clsx"
import { createSignal } from "solid-js"

export default function ClsxTest() {
	const [blue, setBlue] = createSignal(true)
	setInterval(() => setBlue(!blue()), 1000)
	return (
		<div>
			<ClsxDiv blue={blue()} />
		</div>
	)
}

function ClsxDiv(props: { blue: boolean }) {
	return (
		<div class={clsx("w-12 h-12", props.blue ? "bg-blue-500" : "bg-red-500")} />
	)
}
