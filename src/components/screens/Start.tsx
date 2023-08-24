import { Icon } from "solid-heroicons"
import { chevronRight, xMark } from "solid-heroicons/outline"
import { For, createSignal } from "solid-js"
import { Library } from "~/backend/interfaces"
import CreateLibraryForm from "../fragments/CreateLibraryForm"
import Dialog from "../fragments/Dialog"

interface Props {
	libraries: Library[]
	onSelect: (rootPath: string) => void
	onCreate: (input: { rootPath: string; name: string }) => void
}

export default function StartScreen(props: Props) {
	const [openDialog, setOpenDialog] = createSignal(false)
	const closeDialog = () => setOpenDialog(false)
	return (
		<div class="sm:flex items-center justify-center h-screen">
			<div class="overflow-hidden bg-white shadow sm:rounded-lg w-full h-full sm:w-96 sm:h-auto">
				<div class="px-4 py-5 sm:p-6 w-full">
					<h2 class="text-lg font-medium">Select a photo library</h2>
					<ul
						role="list"
						class="mt-6 divide-y divide-gray-200 border-t border-b border-gray-200"
					>
						<For each={props.libraries}>
							{(library) => (
								<li>
									<div class="group relative flex items-start space-x-3 py-4 bg-white hover:bg-slate-50">
										<div class="min-w-0 flex-1">
											<div class="text-sm font-medium">
												<button
													onClick={() => props.onSelect(library.rootPath)}
												>
													<span class="absolute inset-0" aria-hidden="true" />
													{library.name}
												</button>
											</div>
											<p class="text-sm text-gray-500">{library.rootPath}</p>
										</div>
										<div class="flex-shrink-0 self-center">
											<Icon
												path={chevronRight}
												class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
												aria-hidden="true"
											/>
										</div>
									</div>
								</li>
							)}
						</For>
					</ul>
					<div class="mt-6 flex">
						<button
							onClick={() => setOpenDialog(true)}
							class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
						>
							Or add a new library
							<span aria-hidden="true"> &rarr;</span>
						</button>

						<Dialog
							open={openDialog()}
							onClose={closeDialog}
							class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
						>
							<button
								onClick={closeDialog}
								class="w-8 h-8 absolute top-0 right-0"
							>
								<Icon path={xMark} />
							</button>
							<CreateLibraryForm
								onCreate={(input) => {
									props.onCreate(input)
									closeDialog()
								}}
							/>
						</Dialog>
					</div>
				</div>
			</div>
		</div>
	)
}
