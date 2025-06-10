import type { SortStep } from './types'

/**
 * Insertion Sort
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * How it works:
 * 1. Start with the second element
 * 2. Compare it with the previous elements
 * 3. Insert it in the correct position
 * 4. Repeat for all elements
 */
export function* insertionSort(arr: number[]): Generator<SortStep, void, unknown> {
	const a = arr.slice()

	// Yield initial state
	yield { array: [...a], swapped: [-1, -1] }

	for (let i = 1; i < a.length; i++) {
		const key = a[i]
		let j = i - 1

		while (j >= 0 && a[j] > key) {
			a[j + 1] = a[j]
			yield { array: [...a], swapped: [j, j + 1] }
			j--
		}
		a[j + 1] = key
		yield { array: [...a], swapped: [j + 1, j + 1] }
	}
}

export const insertionSortInfo = {
	name: 'Insertion Sort',
	description:
		'A simple sorting algorithm that builds the final sorted array one item at a time. Efficient for small data sets and nearly sorted data. Works like sorting playing cards in your hands.',
	code: `/**
 * Insertion Sort
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * How it works:
 * 1. Start with the second element
 * 2. Compare it with the previous elements
 * 3. Insert it in the correct position
 * 4. Repeat for all elements
 */
function insertionSort(arr: number[]): number[] {
    const a = arr.slice()
    
    for (let i = 1; i < a.length; i++) {
        const key = a[i]
        let j = i - 1
        
        // Move elements greater than key
        // to one position ahead
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j]
            j--
        }
        a[j + 1] = key
    }
    
    return a
}`,
}
