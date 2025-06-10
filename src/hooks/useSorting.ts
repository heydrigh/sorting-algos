import { useCallback, useRef } from 'react'
import type { SortStep } from '@/lib/sorting/types'

interface UseSortingProps {
	algorithm: (arr: number[]) => Generator<SortStep, void, unknown>
	onStep: (step: SortStep) => void
	onComplete: () => void
	speed: number
}

export function useSorting({ algorithm, onStep, onComplete, speed }: UseSortingProps) {
	const isSortingRef = useRef(false)
	const lastStepTimeRef = useRef(0)

	const startSorting = useCallback(
		(arr: number[]) => {
			if (isSortingRef.current) return

			isSortingRef.current = true
			const gen = algorithm(arr)

			function animate() {
				if (!isSortingRef.current) return

				const now = performance.now()
				const elapsed = now - lastStepTimeRef.current

				if (elapsed >= speed) {
					const result = gen.next()
					if (result.done) {
						isSortingRef.current = false
						onComplete()
						return
					}
					onStep(result.value)
					lastStepTimeRef.current = now
				}

				requestAnimationFrame(animate)
			}

			lastStepTimeRef.current = performance.now()
			requestAnimationFrame(animate)
		},
		[algorithm, onStep, onComplete, speed]
	)

	const resetSorting = useCallback(() => {
		isSortingRef.current = false
	}, [])

	return {
		startSorting,
		resetSorting,
		isSorting: isSortingRef.current,
	}
}
