<template>
	<div class="sm:flex items-center justify-center h-screen">
		<div
			class="overflow-hidden bg-white shadow sm:rounded-lg w-full h-full sm:w-96 sm:h-auto"
		>
			<div class="px-4 py-5 sm:p-6 w-full">
				<h2 class="text-lg font-medium">Select a photo library</h2>
				<ul
					role="list"
					class="mt-6 divide-y divide-gray-200 border-t border-b border-gray-200"
				>
					<li v-for="library in libraries" :key="library.id">
						<div
							class="group relative flex items-start space-x-3 py-4 bg-white hover:bg-slate-50"
						>
							<div class="min-w-0 flex-1">
								<div class="text-sm font-medium">
									<button @click="onSelect(library.id)">
										<span class="absolute inset-0" aria-hidden="true" />
										{{ library.name }}
									</button>
								</div>
								<p class="text-sm text-gray-500">{{ library.rootPath }}</p>
							</div>
							<div class="flex-shrink-0 self-center">
								<ChevronRightIcon
									class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
									aria-hidden="true"
								/>
							</div>
						</div>
					</li>
				</ul>
				<div class="mt-6 flex">
					<button
						@click="open = true"
						class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
					>
						Or add a new library
						<span aria-hidden="true"> &rarr;</span>
					</button>

					<TransitionRoot as="template" :show="open">
						<Dialog as="div" class="relative z-10" @close="open = false">
							<TransitionChild
								as="template"
								enter="ease-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in duration-200"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div
									class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
								/>
							</TransitionChild>

							<div class="fixed inset-0 z-10 overflow-y-auto">
								<div
									class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
								>
									<TransitionChild
										as="template"
										enter="ease-out duration-300"
										enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
										enter-to="opacity-100 translate-y-0 sm:scale-100"
										leave="ease-in duration-200"
										leave-from="opacity-100 translate-y-0 sm:scale-100"
										leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									>
										<DialogPanel
											class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
										>
											<div>
												<DialogTitle
													as="h3"
													class="text-lg text-center font-medium leading-6 text-gray-900"
													>Create a photo library</DialogTitle
												>
												<div class="mt-4">
													<Form
														:initial-values="{ name: '', rootPath: '' }"
														:validation-schema="formSchema"
														@submit="onFormSubmit"
													>
														<div>
															<label
																for="name"
																class="block text-sm font-medium text-gray-700"
																>Name</label
															>
															<div class="mt-1">
																<Field
																	id="name"
																	name="name"
																	autocomplete="name"
																	required
																	class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																/>
															</div>
															<ErrorMessage
																class="mt-2 text-sm text-red-600"
																name="name"
															/>
														</div>

														<div class="mt-6">
															<label
																for="rootPath"
																class="block text-sm font-medium text-gray-700"
																>Root path</label
															>
															<div class="mt-1">
																<Field
																	id="rootPath"
																	name="rootPath"
																	autocomplete="root path"
																	required
																	class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																/>
															</div>
															<ErrorMessage
																class="mt-2 text-sm text-red-600"
																name="rootPath"
															/>
														</div>

														<div class="mt-12 mb-2">
															<button
																type="submit"
																class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
															>
																Create
															</button>
														</div>
													</Form>
												</div>
											</div>
										</DialogPanel>
									</TransitionChild>
								</div>
							</div>
						</Dialog>
					</TransitionRoot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import type { LibraryBaseData } from '@/lib/layout-types'

export interface Props {
	libraries: LibraryBaseData[]
	onSelect: (libraryId: string) => void
	onCreate: (name: string, rootPath: string) => void
}

const props = defineProps<Props>()

const open = ref(false)
const onFormSubmit = (values: unknown) => {
	const vals = values as { name: string; rootPath: string }
	console.log(vals)
	props.onCreate(vals.name, vals.rootPath)
	open.value = false
}

const formSchema = yup.object({
	name: yup.string().min(2).required(),
	rootPath: yup.string().min(2).required(),
})
</script>
