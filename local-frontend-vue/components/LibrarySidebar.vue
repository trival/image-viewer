<template>
	<div class="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
		<div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
			<div class="relative flex items-start">
				<div class="min-w-0 flex-1 pl-4">
					<div class="text-sm font-medium">
						{{ library.name }}
					</div>
					<p class="text-sm text-gray-500">{{ library.rootPath }}</p>
				</div>
				<button
					class="group flex-shrink-0 self-center p-2"
					@click="onExitClick"
				>
					<ArrowRightOnRectangleIcon
						class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
						aria-hidden="true"
					/>
				</button>
			</div>
			<nav class="mt-5 flex-1 space-y-1 px-4">TODO: Fill navigation</nav>
		</div>
		<div class="flex flex-shrink-0 border-t border-gray-200">
			<button
				@click="onSettingsClick"
				class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-4 py-2 w-full text-sm font-medium rounded-md"
			>
				<CogIcon
					class="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
					aria-hidden="true"
				/>
				Library settings
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { LibraryBaseData } from '@/lib/layout-types'
import { CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

export interface Props {
	library: LibraryBaseData
	onSettingsClick: () => void
	onExitClick: () => void
}

defineProps<Props>()
</script>
