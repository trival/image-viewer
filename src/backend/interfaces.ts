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
