import type { SortStep } from './types'

/**
 * Heap Sort
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 *
 * How it works:
 * 1. Build a max heap from the input array
 * 2. The largest element is at the root of the heap
 * 3. Swap it with the last element and reduce heap size
 * 4. Heapify the root element
 * 5. Repeat until heap is empty
 */
export function* heapSort(arr: number[]): Generator<SortStep, void, unknown> {
	const a = arr.slice()
	const n = a.length

	// Yield initial state
	yield { array: [...a], swapped: [-1, -1] }

	// Build max heap
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		yield* heapify(n, i)
	}

	// Extract elements from heap one by one
	for (let i = n - 1; i > 0; i--) {
		// Move current root to end
		;[a[0], a[i]] = [a[i], a[0]]
		yield { array: [...a], swapped: [0, i] }

		// Call heapify on the reduced heap
		yield* heapify(i, 0)
	}

	// Helper function to heapify a subtree rooted at index i
	function* heapify(n: number, i: number): Generator<SortStep, void, unknown> {
		let largest = i
		const left = 2 * i + 1
		const right = 2 * i + 2

		// If left child is larger than root
		if (left < n && a[left] > a[largest]) {
			largest = left
		}

		// If right child is larger than largest so far
		if (right < n && a[right] > a[largest]) {
			largest = right
		}

		// If largest is not root
		if (largest !== i) {
			;[a[i], a[largest]] = [a[largest], a[i]]
			yield { array: [...a], swapped: [i, largest] }

			// Recursively heapify the affected sub-tree
			yield* heapify(n, largest)
		}
	}
}

export const heapSortInfo = {
	name: 'Heap Sort',
	description:
		'A comparison-based sorting algorithm that uses a binary heap data structure. Guarantees O(n log n) performance and is in-place. Useful when you need guaranteed worst-case performance.',
	code: `/**
 * Heap Sort
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 * 
 * How it works:
 * 1. Build a max heap from the input array
 * 2. The largest element is at the root of the heap
 * 3. Swap it with the last element and reduce heap size
 * 4. Heapify the root element
 * 5. Repeat until heap is empty
 */
function heapSort(arr: number[]): number[] {
    const a = arr.slice()
    const n = a.length
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i)
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [a[0], a[i]] = [a[i], a[0]]
        
        // Call heapify on the reduced heap
        heapify(i, 0)
    }
    
    // Helper function to heapify a subtree
    function heapify(n: number, i: number) {
        let largest = i
        const left = 2 * i + 1
        const right = 2 * i + 2
        
        // If left child is larger than root
        if (left < n && a[left] > a[largest]) {
            largest = left
        }
        
        // If right child is larger than largest so far
        if (right < n && a[right] > a[largest]) {
            largest = right
        }
        
        // If largest is not root
        if (largest !== i) {
            [a[i], a[largest]] = [a[largest], a[i]]
            
            // Recursively heapify the affected sub-tree
            heapify(n, largest)
        }
    }
    
    return a
}`,
}
