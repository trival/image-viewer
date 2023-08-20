import { Maybe, Result } from "~/libs/types"
import { LibraryError, Tag, TagError, TagMediaLink } from "./interfaces"

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
