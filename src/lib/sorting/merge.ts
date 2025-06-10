import type { SortStep } from './types'

/**
 * Merge Sort
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 *
 * How it works:
 * 1. Divide the array into two halves
 * 2. Recursively sort each half
 * 3. Merge the sorted halves
 */
export function* mergeSort(arr: number[]): Generator<SortStep, void, unknown> {
	// Working copy
	const a = arr.slice()

	/**
	 * Merge two sorted subarrays [l..m] and [m+1..r],
	 * yielding after each element is written back into `a`.
	 * — Here we slice halves once instead of copying element-by-element.
	 */
	function* merge(l: number, m: number, r: number): Generator<SortStep, void, unknown> {
		// Grab left and right halves
		const left = a.slice(l, m + 1)
		const right = a.slice(m + 1, r + 1)

		let i = 0 // index into left
		let j = 0 // index into right
		let k = l // write index into a

		// Merge until one half is drained
		while (i < left.length && j < right.length) {
			if (left[i] <= right[j]) {
				a[k] = left[i++]
			} else {
				a[k] = right[j++]
			}
			// yield after each placement
			yield { array: [...a], swapped: [k, k] }
			k++
		}

		// Drain any remaining left items
		while (i < left.length) {
			a[k] = left[i++]
			yield { array: [...a], swapped: [k, k] }
			k++
		}

		// Drain any remaining right items
		while (j < right.length) {
			a[k] = right[j++]
			yield { array: [...a], swapped: [k, k] }
			k++
		}
	}

	/**
	 * Recursively split and merge, yielding through merge().
	 */
	function* sort(l: number, r: number): Generator<SortStep, void, unknown> {
		if (l < r) {
			const m = Math.floor((l + r) / 2)
			// Sort left half
			yield* sort(l, m)
			// Sort right half
			yield* sort(m + 1, r)
			// Merge them
			yield* merge(l, m, r)
		}
	}

	// Initial unsorted state
	yield { array: [...a], swapped: [-1, -1] }
	// Begin recursion
	yield* sort(0, a.length - 1)
}

export const mergeSortInfo = {
	name: 'Merge Sort',
	description:
		'A divide-and-conquer algorithm that recursively breaks down the problem into smaller subproblems. Guarantees O(n log n) performance and is stable. Best when stability is required.',
	code: `/**
 * Merge Sort
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * How it works:
 * 1. Divide the array into two halves
 * 2. Recursively sort each half
 * 3. Merge the sorted halves
 */
function mergeSort(arr: number[]): number[] {
    const a = arr.slice()
    const temp = new Array(a.length)
    
    // Merge two sorted subarrays
    function merge(l: number, m: number, r: number) {
        // Copy both halves to temp array
        for (let i = l; i <= r; i++) {
            temp[i] = a[i]
        }
        
        let i = l // pointer in left half
        let j = m + 1 // pointer in right half
        let k = l // write pointer in a
        
        // While both halves have elements, pick the smaller
        while (i <= m && j <= r) {
            if (temp[i] <= temp[j]) {
                a[k] = temp[i]
                i++
            } else {
                a[k] = temp[j]
                j++
            }
            k++
        }
        
        // Drain any remaining elements in left half
        while (i <= m) {
            a[k] = temp[i]
            i++
            k++
        }
        
        // Drain any remaining elements in right half
        while (j <= r) {
            a[k] = temp[j]
            j++
            k++
        }
    }
    
    // Main recursive sort function
    function sort(l: number, r: number) {
        if (l < r) {
            const m = Math.floor((l + r) / 2)
            sort(l, m)     // Sort first half
            sort(m + 1, r) // Sort second half
            merge(l, m, r) // Merge the sorted halves
        }
    }
    
    sort(0, a.length - 1)
    return a
}`,
}
