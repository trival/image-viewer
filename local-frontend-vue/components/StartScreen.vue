<template></template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/20/solid"
import { ref } from "vue"
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue"
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"
import type { LibraryBaseData } from "@/lib/layout-types"

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
