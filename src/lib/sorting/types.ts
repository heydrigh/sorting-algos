export type SortStep = { array: number[]; swapped: [number, number] }
export type SortingAlgorithm =
	| 'bubble'
	| 'quick'
	| 'merge'
	| 'insertion'
	| 'heap'
	| 'shell'
	| 'counting'

export type SortingAlgorithmInfo = {
	name: string
	description: string
	generator: (arr: number[]) => Generator<SortStep, void, unknown>
	code: string
}
