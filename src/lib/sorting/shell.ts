import type { SortStep } from './types'

/**
 * Shell Sort
 * Time Complexity: O(n log² n) average case
 * Space Complexity: O(1)
 *
 * How it works:
 * 1. Start with a large gap between elements
 * 2. Compare and swap elements that are far apart
 * 3. Reduce the gap and repeat
 * 4. Finally, perform insertion sort with gap=1
 *
 * Shell sort is an optimization of insertion sort that allows the exchange of items
 * that are far apart. The idea is to arrange the list of elements so that, starting
 * from anywhere, taking every hth element produces a sorted list.
 */
export function* shellSort(arr: number[]): Generator<SortStep, void, unknown> {
	const a = arr.slice()
	const n = a.length

	// Yield initial state
	yield { array: [...a], swapped: [-1, -1] }

	// Start with a big gap, then reduce the gap
	for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
		// Do a gapped insertion sort for this gap size
		for (let i = gap; i < n; i++) {
			// Save a[i] in temp and make a hole at position i
			const temp = a[i]
			let j

			// Shift earlier gap-sorted elements up until the correct
			// location for a[i] is found
			for (j = i; j >= gap && a[j - gap] > temp; j -= gap) {
				a[j] = a[j - gap]
				yield { array: [...a], swapped: [j, j - gap] }
			}

			// Put temp (the original a[i]) in its correct location
			a[j] = temp
			yield { array: [...a], swapped: [j, j] }
		}
	}
}

export const shellSortInfo = {
	name: 'Shell Sort',
	description:
		'An optimization of insertion sort that allows the exchange of items that are far apart. The idea is to arrange the list of elements so that, starting from anywhere, taking every hth element produces a sorted list. Good for medium-sized arrays.',
	code: `/**
 * Shell Sort
 * Time Complexity: O(n log² n) average case
 * Space Complexity: O(1)
 * 
 * How it works:
 * 1. Start with a large gap between elements
 * 2. Compare and swap elements that are far apart
 * 3. Reduce the gap and repeat
 * 4. Finally, perform insertion sort with gap=1
 */
function shellSort(arr: number[]): number[] {
    const a = arr.slice()
    const n = a.length
    
    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do a gapped insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            // Save a[i] in temp and make a hole at position i
            const temp = a[i]
            let j
            
            // Shift earlier gap-sorted elements up until the correct
            // location for a[i] is found
            for (j = i; j >= gap && a[j - gap] > temp; j -= gap) {
                a[j] = a[j - gap]
            }
            
            // Put temp (the original a[i]) in its correct location
            a[j] = temp
        }
    }
    
    return a
}`,
}
