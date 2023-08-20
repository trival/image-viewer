import { Maybe, Result } from "~/libs/types"

export interface Library {
	name: string
	rootPath: string
	ignorePaths: string[]
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

export interface TagService {
	getTags(libPath: string): Promise<Result<Tag[], LibraryError.LibraryNotFound>>
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
