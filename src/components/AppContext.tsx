import {
	ParentProps,
	ResolvedChildren,
	createContext,
	useContext,
} from "solid-js"
import { createStore } from "solid-js/store"
import { Library } from "~/backend/interfaces"
import { trpcClient } from "~/libs/trpc-client"
import { isOk } from "~/libs/types"

export interface State {
	currentLibrary: Library | null
	libraries: Library[]
}

interface CreateLibraryInput {
	rootPath: string
	name: string
}
export interface Actions {
	loadLibraries: () => Promise<void>
	openLibrary: (rootPath: string) => void
	closeLibrary: () => void
	createLibrary: (input: CreateLibraryInput) => Promise<void>
	updateLibrary: (input: {
		name?: string
		ignorePaths?: string[]
	}) => Promise<void>
}

export type AppStore = [State, Actions]

const appCtx = createContext<AppStore>()

export function AppStoreProvider(props: ParentProps) {
	const [state, setState] = createStore<State>({
		currentLibrary: null,
		libraries: [],
	})

	async function loadLibraries() {
		const libs = await trpcClient.getLibraries.query()
		setState("libraries", libs)
	}

	function openLibrary(rootPath: string) {
		const lib = state.libraries.find((l) => l.rootPath === rootPath)
		if (lib) {
			setState("currentLibrary", lib)
		}
	}

	function closeLibrary() {
		setState("currentLibrary", null)
	}

	async function createLibrary(input: CreateLibraryInput) {
		const libResult = await trpcClient.createLibrary.mutate(input)
		if (isOk(libResult)) {
			await loadLibraries()
		}
	}

	const store: AppStore = [
		state,
		{
			loadLibraries,
			openLibrary,
			closeLibrary,
			createLibrary,
			updateLibrary: async (input) => {},
		},
	]

	return <appCtx.Provider value={store}>{props.children}</appCtx.Provider>
}

export function useStore(): AppStore {
	return useContext(appCtx)!
}
