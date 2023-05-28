<template>
	<div class="p-8">
		<h1 class="font-bold">First Component</h1>
		<p>Test: {{ $test.test }}</p>
		<button @click="$test.refreshTest">refreshTest</button>
	</div>
</template>

<script setup lang="ts">
import { useTestStore } from '@/stores/test'

const $test = useTestStore()
</script>
