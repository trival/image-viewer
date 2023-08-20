import { Maybe, Result } from "~/libs/types"

export interface Library {
	name: string
	rootPath: string
	ignorePaths: string[]
	tags: Tag[]
}

export interface Media {
	directory: string
	filename: string
	size: number
	width: number
	height: number
	date: number
	length: number
}

export interface Tag {
	id: string
	name: string
	color: string
}

export interface TagMediaLink {
	tagId: string
	media: string
}

export enum LibraryError {
	LibraryNotFound = "LibraryNotFound",
	LibraryAlreadyExists = "LibraryAlreadyExists",
	RootPathNotDirectory = "RootPathNotDirectory",
}

export enum TagError {
	TagAlreadyExists = "TagAlreadyExists",
	TagNotFound = "TagNotFound",
}

export interface LibraryService {
	// Library basics
	getLibraries(): Promise<Library[]>
	openLibrary(
		rootPath: string,
	): Promise<Result<Library, LibraryError.LibraryNotFound>>
	createLibrary(
		rootPath: string,
		name: string,
	): Promise<Result<Library, LibraryError.LibraryAlreadyExists>>
	updateLibrary(
		rootPath: string,
		name: Maybe<string>,
		ignorePaths: Maybe<string[]>,
	): Promise<Result<Library, LibraryError.LibraryNotFound>>

	getMedia(
		libPath: string,
	): Promise<Result<Media[], LibraryError.LibraryNotFound>>
	reloadMedia(
		libPath: string,
		subPath: Maybe<string>,
	): Promise<Result<Media[], LibraryError.LibraryNotFound>>
}

export interface TagService {
	createTag(
		libPath: string,
		name: string,
		color: Maybe<string>,
	): Promise<
		Result<Tag, LibraryError.LibraryNotFound | TagError.TagAlreadyExists>
	>
	updateTag(
		libPath: string,
		tagId: string,
		name: Maybe<string>,
		color: Maybe<string>,
	): Promise<Result<Tag, LibraryError.LibraryNotFound | TagError.TagNotFound>>
	deleteTag(
		libPath: string,
		tagId: string,
	): Promise<Result<void, LibraryError.LibraryNotFound | TagError.TagNotFound>>

	getTagMediaLinks(
		libPath: string,
	): Promise<Result<TagMediaLink[], LibraryError.LibraryNotFound>>
	addLink(
		libPath: string,
		tagId: string,
		media: string,
	): Promise<Result<void, LibraryError.LibraryNotFound | TagError.TagNotFound>>
	removeLink(
		libPath: string,
		tagId: string,
		media: string,
	): Promise<Result<void, LibraryError.LibraryNotFound | TagError.TagNotFound>>
}
