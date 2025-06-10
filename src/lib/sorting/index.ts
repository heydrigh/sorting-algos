import type { SortStep, SortingAlgorithm, SortingAlgorithmInfo } from './types'
import { bubbleSort, bubbleSortInfo } from './bubble'
import { quickSort, quickSortInfo } from './quick'
import { mergeSort, mergeSortInfo } from './merge'
import { insertionSort, insertionSortInfo } from './insertion'
import { heapSort, heapSortInfo } from './heap'
import { shellSort, shellSortInfo } from './shell'
import { countingSort, countingSortInfo } from './counting'

export const sortingAlgorithms: Record<SortingAlgorithm, SortingAlgorithmInfo> = {
	bubble: { ...bubbleSortInfo, generator: bubbleSort },
	quick: { ...quickSortInfo, generator: quickSort },
	merge: { ...mergeSortInfo, generator: mergeSort },
	insertion: { ...insertionSortInfo, generator: insertionSort },
	heap: { ...heapSortInfo, generator: heapSort },
	shell: { ...shellSortInfo, generator: shellSort },
	counting: { ...countingSortInfo, generator: countingSort },
}

export const sortingFunctions = {
	bubble: bubbleSort,
	quick: quickSort,
	merge: mergeSort,
	insertion: insertionSort,
	heap: heapSort,
	shell: shellSort,
	counting: countingSort,
}

export type { SortStep, SortingAlgorithmInfo }
