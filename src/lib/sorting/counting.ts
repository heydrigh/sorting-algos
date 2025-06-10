import type { SortStep } from './types'

/**
 * Counting Sort
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(n + k)
 *
 * How it works:
 * 1. Count the frequency of each element
 * 2. Calculate the cumulative sum of frequencies
 * 3. Place elements in their correct positions
 * 4. Copy back to original array
 *
 * Counting sort is a non-comparison based sorting algorithm that works by counting
 * the occurrences of each element. It's very efficient when the range of input
 * data (k) is not significantly greater than the number of objects to be sorted (n).
 */
export function* countingSort(arr: number[]): Generator<SortStep, void, unknown> {
	const a = arr.slice()
	const n = a.length

	// Yield initial state
	yield { array: [...a], swapped: [-1, -1] }

	// Create a map to store counts
	const count = new Map<number, number>()
	const output = new Array(n).fill(0)

	// Store count of each element
	for (let i = 0; i < n; i++) {
		const value = a[i]
		count.set(value, (count.get(value) || 0) + 1)
		yield { array: [...a], swapped: [i, i] }
	}

	// Get sorted unique values
	const sortedValues = Array.from(count.keys()).sort((a, b) => a - b)

	// Calculate cumulative sum
	let sum = 0
	for (const value of sortedValues) {
		sum += count.get(value) || 0
		count.set(value, sum)
	}

	// Build the output array
	for (let i = n - 1; i >= 0; i--) {
		const value = a[i]
		const pos = (count.get(value) || 0) - 1
		output[pos] = value
		count.set(value, pos)
		yield { array: [...output], swapped: [i, i] }
	}

	// Copy the output array to arr
	for (let i = 0; i < n; i++) {
		a[i] = output[i]
		yield { array: [...a], swapped: [i, i] }
	}
}

export const countingSortInfo = {
	name: 'Counting Sort',
	description:
		'A non-comparison based sorting algorithm that works by counting the occurrences of each element. Very efficient when the range of input data is not significantly greater than the number of objects to be sorted. Requires extra space but can be faster than comparison-based sorts.',
	code: `/**
 * Counting Sort
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(n + k)
 * 
 * How it works:
 * 1. Count the frequency of each element
 * 2. Calculate the cumulative sum of frequencies
 * 3. Place elements in their correct positions
 * 4. Copy back to original array
 */
function countingSort(arr: number[]): number[] {
    const a = arr.slice()
    const n = a.length
    
    // Create a map to store counts
    const count = new Map<number, number>()
    const output = new Array(n).fill(0)
    
    // Store count of each element
    for (let i = 0; i < n; i++) {
        const value = a[i]
        count.set(value, (count.get(value) || 0) + 1)
    }
    
    // Get sorted unique values
    const sortedValues = Array.from(count.keys()).sort((a, b) => a - b)
    
    // Calculate cumulative sum
    let sum = 0
    for (const value of sortedValues) {
        sum += count.get(value) || 0
        count.set(value, sum)
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const value = a[i]
        const pos = (count.get(value) || 0) - 1
        output[pos] = value
        count.set(value, pos)
    }
    
    // Copy the output array to arr
    for (let i = 0; i < n; i++) {
        a[i] = output[i]
    }
    
    return a
}`,
}
