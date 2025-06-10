export interface ControlsProps {
	arraySize: number
	speed: number
	selectedAlgorithm: SortingAlgorithm
	isComplete: boolean
	isSorting: boolean
	onAlgorithmChange: (algorithm: SortingAlgorithm) => void
	onSizeChange: (size: number) => void
	onSpeedChange: (speed: number) => void
	onStart: () => void
	onReset: () => void
}
