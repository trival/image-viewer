<template>
	<main>
		<LibraryView
			v-if="$libs.currentLibrary"
			:library="$libs.currentLibrary"
			:on-close-library="() => $libs.setCurrentLibrary(null)"
		/>
		<StartScreen
			v-else
			:libraries="$libs.allLibraries"
			:on-select="(id) => $libs.setCurrentLibrary(id)"
			:on-create="(name, rootPath) => $libs.createLibrary(name, rootPath)"
		/>
	</main>
</template>

<script setup lang="ts">
import LibraryView from './components/LibraryView.vue'
import StartScreen from './components/StartScreen.vue'
import { useLibraryStore } from './stores/library'

const $libs = useLibraryStore()
</script>
