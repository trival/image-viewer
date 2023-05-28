import StartScreen from './StartScreen.vue'

export default {
	component: StartScreen,
	argTypes: {
		onSelect: { action: 'onSelect' },
		onCreate: { action: 'onCreate' },
	},
	parameters: { layout: 'fullscreen' },
}

export const Default = {
	args: {
		libraries: [
			{
				id: '1',
				name: 'Family pictures',
				rootPath: '/home/user/images/family',
			},
			{
				id: '2',
				name: 'Dog pictures',
				rootPath: '/home/user/images/dogs',
			},
			{
				id: '3',
				name: 'Cat pictures',
				rootPath: '/home/user/images/cats',
			},
		],
	},
}

export const Empty = {
	args: {
		libraries: [],
	},
}
