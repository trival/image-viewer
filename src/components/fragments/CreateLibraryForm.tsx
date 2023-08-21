import clsx from "clsx"
import { Show, createEffect, createSignal } from "solid-js"

interface Props {
	onCreate: (input: { rootPath: string; name: string }) => void
}

export default function CreateLibraryForm(props: Props) {
	const [rootPath, setRootPath] = createSignal("")
	const [name, setName] = createSignal("")
	const [error, setError] = createSignal("")

	createEffect(() => {
		if (rootPath() && name()) {
			setError("")
		}
	})

	function onFormSubmit(e: Event) {
		e.preventDefault()
		if (!rootPath() || !name()) {
			setError("Please fill out both fields")
			return
		}
		props.onCreate({ rootPath: rootPath(), name: name() })
	}

	return (
		<div>
			<h3 class="text-lg text-center font-medium leading-6 text-gray-900">
				Create a photo library
			</h3>
			<div class="mt-4">
				<form onSubmit={onFormSubmit}>
					<Show when={error()}>
						<p class="mt-2 text-sm text-red-600">{error()}</p>
					</Show>

					<TextField
						id="name"
						name="name"
						label="Name"
						type="text"
						required
						value={name()}
						onChange={setName}
					/>

					<TextField
						id="tootPath"
						name="rootPath"
						label="Root path"
						type="text"
						required
						value={rootPath()}
						onChange={setRootPath}
						class="mt-2"
					/>

					<div class="mt-12 mb-2">
						<button
							type="submit"
							class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

interface FieldProps {
	id: string
	name: string
	label: string
	required?: boolean
	class?: string
	type: "text" | "password" | "email" | "number"
	errorMessage?: string
	value: string
	onChange: (value: string) => void
}

function TextField(props: FieldProps) {
	return (
		<div class={props.class}>
			<label for={props.id} class="block text-sm font-medium text-gray-700">
				{props.label}
			</label>
			<div class="mt-1">
				<input
					type={props.type}
					id={props.id}
					name={props.name}
					required={props.required}
					class={clsx(
						"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
					)}
					value={props.value}
					onChange={(e) => props.onChange(e.currentTarget.value)}
				/>
			</div>
			<Show when={props.errorMessage}>
				<p class="mt-2 text-sm text-red-600">{props.errorMessage}</p>
			</Show>
		</div>
	)
}
