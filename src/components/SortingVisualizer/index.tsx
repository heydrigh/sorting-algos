'use client'
import { useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Bar from '../Bar'
import Controls from '../Controls'
import { useControls } from '@/hooks/useControls'
import { useVisualization } from '@/hooks/useVisualization'
import { sortingAlgorithms } from '@/lib/sorting'
import { SortingAlgorithm } from '@/lib/sorting/types'

export default function SortingVisualizer() {
	const {
		arraySize,
		speed,
		selectedAlgorithm,
		handleAlgorithmChange,
		handleSizeChange,
		handleSpeedChange,
	} = useControls({
		onReset: () => {},
	})

	const { data, activeIndices, isComplete, isSorting, handleStart, handleReset } = useVisualization(
		{
			arraySize,
			speed,
			selectedAlgorithm,
		}
	)

	const bars = useMemo(
		() =>
			data.map((value, index) => (
				<Bar
					key={index}
					value={value}
					isActive={activeIndices.includes(index)}
					width={Math.max(100 / arraySize, 1)}
					maxValue={arraySize}
				/>
			)),
		[data, activeIndices, arraySize]
	)

	const onAlgorithmChange = (algorithm: SortingAlgorithm) => {
		handleAlgorithmChange(algorithm)
		handleReset()
	}
	const onSizeChange = (size: number) => {
		handleSizeChange(size)
		handleReset()
	}
	const onSpeedChange = (speed: number) => {
		handleSpeedChange(speed)
		handleReset()
	}

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Modern Gradient Header */}
			<header className='w-full  bg-gradient-to-r from-indigo-900 via-gray-900 to-gray-800 shadow-lg py-6 px-4 flex flex-col items-center'>
				<h1 className='text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-lg flex items-center gap-2'>
					<span role='img' aria-label='music'>
						🎵
					</span>{' '}
					Sorting Visualizer <span className='hidden md:inline'>with Sound</span>
				</h1>
				<p className='mt-2 text-gray-300 text-sm md:text-base font-mono opacity-80'>
					Visualize, listen, and learn classic sorting algorithms.
				</p>
			</header>

			<Controls
				arraySize={arraySize}
				speed={speed}
				selectedAlgorithm={selectedAlgorithm}
				isComplete={isComplete}
				isSorting={isSorting}
				onAlgorithmChange={onAlgorithmChange}
				onSizeChange={onSizeChange}
				onSpeedChange={onSpeedChange}
				onStart={handleStart}
				onReset={handleReset}
			/>

			{/* Visualization Area */}
			<div className='w-full flex flex-col md:flex-row h-[calc(100vh-112px)]'>
				{/* Bars Visualization */}
				<div className='w-full md:w-1/2 h-full bg-gray-900 p-2 md:p-4 overflow-hidden'>
					<div className='h-full w-full flex items-end gap-[1px]'>{bars}</div>
				</div>

				{/* Code Display */}
				<div className='w-full md:w-1/2 max-h-[40vh] md:max-h-none h-auto md:h-full bg-gray-800 p-4 overflow-y-auto'>
					<SyntaxHighlighter
						language='typescript'
						style={oneDark}
						customStyle={{
							margin: 0,
							background: 'transparent',
							padding: '1rem',
						}}
					>
						{sortingAlgorithms[selectedAlgorithm].code}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	)
}
