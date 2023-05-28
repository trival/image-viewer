import { api } from '@/gql/api'
import type { Library } from '@/gql/sdk'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface LibraryInput {
	id: string
	name?: string
	ignorePaths?: string[]
}

export const useLibraryStore = defineStore('library', () => {
	// State

	const currentLibrary = ref<Library | null>(null)
	const allLibraries = ref<Library[]>([])

	const librariesById = computed(() => {
		const librariesById: Record<string, Library> = {}
		for (const library of allLibraries.value) {
			librariesById[library.id] = library
		}
		return librariesById
	})

	// Actions

	async function refreshLibraries() {
		const apiResult = await api.GetLibraries()
		allLibraries.value = apiResult.getLibraries || []
	}

	function setCurrentLibrary(id?: string | null) {
		if (!id) {
			currentLibrary.value = null
			return
		}

		const library = librariesById.value[id]
		if (library) {
			currentLibrary.value = library
		}
	}

	async function createLibrary(name: string, rootPath: string) {
		const result = await api.CreateLibrary({ name, rootPath })
		await refreshLibraries()
		if (result.createLibrary.id) {
			setCurrentLibrary(result.createLibrary.id)
		}
	}

	async function updateLibrary(library: LibraryInput) {
		await api.UpdateLibrary(library)
		return refreshLibraries()
	}

	async function deleteLibrary(id: string) {
		await api.DeleteLibrary({ id })
		return refreshLibraries()
	}

	// Initialization

	refreshLibraries().catch(console.error)

	return {
		currentLibrary,
		allLibraries,
		setCurrentLibrary,
		createLibrary,
		updateLibrary,
		deleteLibrary,
	}
})
