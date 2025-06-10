import { useState, useCallback } from 'react'
import { SortingAlgorithm } from '@/lib/sorting/types'

interface UseControlsProps {
	onReset: () => void
}

export function useControls({ onReset }: UseControlsProps) {
	const [arraySize, setArraySize] = useState(60)
	const [speed, setSpeed] = useState(50)
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble')

	const handleAlgorithmChange = useCallback(
		(algorithm: SortingAlgorithm) => {
			setSelectedAlgorithm(algorithm)
			onReset()
		},
		[onReset]
	)

	const handleSizeChange = useCallback(
		(size: number) => {
			setArraySize(size)
			onReset()
		},
		[onReset]
	)

	const handleSpeedChange = useCallback((newSpeed: number) => {
		setSpeed(newSpeed)
	}, [])

	return {
		arraySize,
		speed,
		selectedAlgorithm,
		handleAlgorithmChange,
		handleSizeChange,
		handleSpeedChange,
	}
}
