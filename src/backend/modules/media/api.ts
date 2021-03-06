import { ID } from '@/backend/types'
import { ILibraryRepository } from '../libraries/repository'
import { IMediaEntity } from './entities/media'
import { IMediaRepository } from './repository'
import { IFileService } from './services/fileService'
import { diffMedia } from './services/mediaLibs'

export interface IMediaApi {
	// Queries
	getMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	getMediaOfAlbum(albumId: ID): Promise<IMediaEntity[]>

	// Commands
	refreshMedia(id: ID): Promise<IMediaEntity>
	refreshMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	addMediaToAlbum(ids: ID[], albumID: ID): Promise<IMediaEntity>
	removeMediaFromAlbum(ids: ID[], albumID: ID): Promise<IMediaEntity>
}

export function createMediaApi(
	repo: IMediaRepository,
	libRepo: ILibraryRepository,
	fileService: IFileService,
) {
	const api = {} as IMediaApi

	api.getMediaOfAlbum = repo.getMediaOfAlbum

	api.getMediaOfLibrary = repo.getMediaOfLibrary

	api.refreshMedia = async (id) => {
		const media = await repo.getMediaById(id)
		const lib = await libRepo.getLibraryById(media.libraryId)
		const freshMedia = await fileService.getMediaDataForPath(
			lib.rootPath,
			media.fullPath,
			{
				withMediaMeta: true,
			},
		)
		await repo.saveMedia([freshMedia])
		return freshMedia
	}

	api.refreshMediaOfLibrary = async (libId) => {
		const lib = await libRepo.getLibraryById(libId)
		const oldMedia = await repo.getMediaOfLibrary(libId)
		const newMedia = await fileService.getMediaDataForRootPath(lib.rootPath)
		const diff = diffMedia(oldMedia, newMedia)
		await repo.deleteMedia(diff.delete)
		await repo.saveMedia(diff.update.map((e) => ({ ...e, libraryId: libId }))) // TODO: refactor into Media Model
		return repo.getMediaOfLibrary(libId)
	}

	return api
}
