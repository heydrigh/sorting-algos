import { useState, useRef, useCallback, useEffect } from 'react'
import { type SortStep } from '@/lib/sorting/types'
import { useAudio } from './useAudio'
import { useSorting } from './useSorting'
import { sortingAlgorithms } from '@/lib/sorting'
import type { SortingAlgorithm } from '@/lib/sorting/types'

interface UseVisualizationProps {
	arraySize: number
	speed: number
	selectedAlgorithm: SortingAlgorithm
}

export function useVisualization({ arraySize, speed, selectedAlgorithm }: UseVisualizationProps) {
	const [data, setData] = useState<number[]>([])
	const [activeIndices, setActiveIndices] = useState<[number, number]>([-1, -1])
	const [isComplete, setIsComplete] = useState(false)
	const { playNote } = useAudio()
	const dataRef = useRef(data)
	const completeRef = useRef(false)
	const pendingStep = useRef<SortStep | null>(null)
	const rafScheduled = useRef(false)

	useEffect(() => {
		const newData = shuffleArray(Array.from({ length: arraySize }, (_, i) => i + 1))
		setData(newData)
		dataRef.current = newData
	}, [arraySize])

	const updateArray = useCallback((step: SortStep) => {
		return step.array
	}, [])

	const handleStep = useCallback(
		(step: SortStep) => {
			pendingStep.current = step

			if (!rafScheduled.current) {
				rafScheduled.current = true
				requestAnimationFrame(() => {
					const s = pendingStep.current!
					setData(() => updateArray(s))
					setActiveIndices(s.swapped)

					if (s.swapped[0] !== -1) {
						playNote(200 + s.array[s.swapped[0]] * 5)
					}

					rafScheduled.current = false
					pendingStep.current = null
				})
			}
		},
		[playNote, updateArray]
	)

	const handleComplete = useCallback(() => {
		setIsComplete(true)
		setActiveIndices([-1, -1])

		data.forEach((value, index) => {
			setTimeout(() => {
				setActiveIndices([index, index])
				playNote(200 + value * 5)
			}, index * 30)
		})
	}, [data, playNote])

	const speedMultipliers: Record<SortingAlgorithm, number> = {
		bubble: 1,
		quick: 2,
		merge: 4,
		insertion: 1,
		heap: 3,
		shell: 2,
		counting: 1,
	}

	const effectiveSpeed = Math.max(1, speed / speedMultipliers[selectedAlgorithm])

	const { startSorting, resetSorting, isSorting } = useSorting({
		algorithm: sortingAlgorithms[selectedAlgorithm].generator,
		onStep: handleStep,
		onComplete: handleComplete,
		speed: effectiveSpeed,
	})

	const handleStart = useCallback(() => {
		completeRef.current = false
		setIsComplete(false)
		startSorting(dataRef.current)
	}, [startSorting])

	const handleReset = useCallback(() => {
		resetSorting()
		completeRef.current = false
		setIsComplete(false)
		const newData = shuffleArray(Array.from({ length: arraySize }, (_, i) => i + 1))
		setData(newData)
		dataRef.current = newData
		setActiveIndices([-1, -1])
	}, [arraySize, resetSorting])

	return {
		data,
		activeIndices,
		isComplete,
		isSorting,
		handleStart,
		handleReset,
	}
}

function shuffleArray(arr: number[]): number[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}
	return arr
}
