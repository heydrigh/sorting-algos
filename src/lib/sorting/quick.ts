import type { SortStep } from './types'

/**
 * Quick Sort
 * Time Complexity: O(n log n) average, O(n²) worst
 * Space Complexity: O(log n)
 *
 * How it works:
 * 1. Choose a pivot element
 * 2. Partition the array around the pivot
 * 3. Recursively sort the subarrays
 */
export function* quickSort(arr: number[]): Generator<SortStep, void, unknown> {
	const a = arr.slice()

	/**
	 * Partition the array around a pivot element
	 * Returns the final position of the pivot
	 */
	function* partition(l: number, r: number): Generator<SortStep, number, unknown> {
		const pivot = a[r]
		let i = l - 1

		for (let j = l; j < r; j++) {
			if (a[j] <= pivot) {
				i++
				;[a[i], a[j]] = [a[j], a[i]]
				yield { array: [...a], swapped: [i, j] }
			}
		}

		;[a[i + 1], a[r]] = [a[r], a[i + 1]]
		yield { array: [...a], swapped: [i + 1, r] }
		return i + 1
	}

	/**
	 * Recursively sort the array
	 */
	function* sort(l: number, r: number): Generator<SortStep, void, unknown> {
		if (l < r) {
			const p = yield* partition(l, r)
			yield* sort(l, p - 1)
			yield* sort(p + 1, r)
		}
	}

	// Yield initial state
	yield { array: [...a], swapped: [-1, -1] }
	// Start the recursive sort
	yield* sort(0, a.length - 1)
}

export const quickSortInfo = {
	name: 'Quick Sort',
	description:
		'A divide-and-conquer algorithm that uses a pivot element to partition the array. Very efficient in practice, with O(n log n) average case performance. Not stable.',
	code: `/**
 * Quick Sort
 * Time Complexity: O(n log n) average, O(n²) worst
 * Space Complexity: O(log n)
 * 
 * How it works:
 * 1. Choose a pivot element
 * 2. Partition the array around the pivot
 * 3. Recursively sort the subarrays
 */
function quickSort(arr: number[]): number[] {
    const a = arr.slice()
    
    // Partition the array around a pivot
    function partition(l: number, r: number): number {
        const pivot = a[r]
        let i = l - 1
        
        for (let j = l; j < r; j++) {
            if (a[j] <= pivot) {
                i++
                [a[i], a[j]] = [a[j], a[i]]
            }
        }
        
        [a[i + 1], a[r]] = [a[r], a[i + 1]]
        return i + 1
    }
    
    // Main recursive sort function
    function sort(l: number, r: number) {
        if (l < r) {
            const p = partition(l, r)
            sort(l, p - 1)  // Sort left subarray
            sort(p + 1, r)  // Sort right subarray
        }
    }
    
    sort(0, a.length - 1)
    return a
}`,
}
