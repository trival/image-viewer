import { ID } from '@/backend/types'
import { IFileMeta } from './fileMeta'
import { IMediaMeta } from './mediaMeta'

export enum EMediaType {
	IMAGE = 'IMAGE',
	VIDEO = 'VIDEO',
}

export type IMediaEntity = Readonly<{
	id: ID
	libraryId: ID
	type: EMediaType
	directory: string
	fullPath: string
	thumbPath?: string
	albums: Readonly<ID[]>
	fileMeta?: IFileMeta
	mediaMeta?: IMediaMeta
}>

export const mediaDefaultValues = {
	type: EMediaType.IMAGE,
	albums: [],
} as const
