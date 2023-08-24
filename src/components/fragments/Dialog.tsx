import { Motion, Presence } from "@motionone/solid"
import { ParentProps, Show } from "solid-js"

interface Props {
	open: boolean
	onClose: () => void
	class: string
}

export default function Dialog(props: ParentProps<Props>) {
	return (
		<Presence exitBeforeEnter>
			<Show when={props.open}>
				<Motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					class="relative z-10"
				>
					<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

					<div class="fixed inset-0 z-10 overflow-y-auto">
						<div
							class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
							onClick={() => props.onClose()}
						>
							<div class={props.class} onClick={(e) => e.stopPropagation()}>
								{props.children}
							</div>
						</div>
					</div>
				</Motion.div>
			</Show>
		</Presence>
	)
}
