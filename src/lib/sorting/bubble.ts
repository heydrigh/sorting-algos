import type { SortStep } from './types'

/**
 * Bubble Sort
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * How it works:
 * 1. Compare adjacent elements and swap them if they are in wrong order
 * 2. After each pass, the largest unsorted element "bubbles up" to its correct position
 * 3. Repeat until no swaps are needed
 */
export function* bubbleSort(arr: number[]): Generator<SortStep, void, unknown> {
	const a = arr.slice()
	const n = a.length

	// Yield initial state
	yield { array: [...a], swapped: [-1, -1] }

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (a[j] > a[j + 1]) {
				;[a[j], a[j + 1]] = [a[j + 1], a[j]]
				yield { array: [...a], swapped: [j, j + 1] }
			}
		}
	}
}

export const bubbleSortInfo = {
	name: 'Bubble Sort',
	description:
		'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Best for small datasets or when simplicity is preferred.',
	code: `/**
 * Bubble Sort
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * How it works:
 * 1. Compare adjacent elements and swap them if they are in wrong order
 * 2. After each pass, the largest unsorted element "bubbles up" to its correct position
 * 3. Repeat until no swaps are needed
 */
function bubbleSort(arr: number[]): number[] {
    const a = arr.slice()
    const n = a.length
    
    // Outer loop: number of passes
    for (let i = 0; i < n; i++) {
        // Inner loop: compare and swap adjacent elements
        for (let j = 0; j < n - i - 1; j++) {
            // If current element is greater than next, swap them
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]]
            }
        }
    }
    return a
}`,
}
