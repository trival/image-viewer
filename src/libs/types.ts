export type Maybe<T> = T | null | undefined

export function defined<T>(t: Maybe<T>): t is T {
	return t != null
}

export function truthy<T>(t: T | null | undefined | "" | false | 0): t is T {
	return !!t
}

export type Error<E> = { error: E }
export type Success<R> = { success: R }
export type Result<R, E> = Error<E> | Success<R>

export function error<E>(error: E): Error<E> {
	return { error }
}
export function success<R>(success: R): Success<R> {
	return { success }
}
export function isError<R, E>(result: Result<R, E>): result is Error<E> {
	return "error" in result
}
export function isSuccess<R, E>(result: Result<R, E>): result is Success<R> {
	return "success" in result
}
