import { createSignal } from "solid-js"
import Dialog from "~/components/fragments/Dialog"

export default function DialogTest() {
	const [open, setOpen] = createSignal(false)
	return (
		<div>
			<button onClick={() => setOpen(true)}>open</button>
			<Dialog onClose={() => setOpen(false)} open={open()} class="w-32">
				<div class="h-32 bg-purple-400 " />
			</Dialog>
		</div>
	)
}
