import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../gql/api'

export const useTestStore = defineStore('testApi', () => {
	const test = ref('')

	async function refreshTest() {
		const apiResult = await api.Test()
		console.log(apiResult)
		test.value = apiResult.test
	}

	refreshTest().catch(console.error)

	return { test, refreshTest }
})
