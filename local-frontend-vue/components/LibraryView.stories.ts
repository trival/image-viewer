import GalleryView from './LibraryView.vue'

export default {
	component: GalleryView,
	parameters: { layout: 'fullscreen' },

	argTypes: {
		onCloseLibrary: { action: 'onCloseLibrary' },
	},
}

export const Default = {
	args: {
		library: {
			id: '1',
			name: 'Family pictures',
			rootPath: '/home/user/images/family',
		},
	},
}
