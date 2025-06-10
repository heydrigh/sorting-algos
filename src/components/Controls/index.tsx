import { cn } from '@/lib/utils'
import { sortingAlgorithms } from '@/lib/sorting'
import type { SortingAlgorithm } from '@/lib/sorting/types'
import { ControlsProps } from './types'

export default function Controls({
	arraySize,
	speed,
	selectedAlgorithm,
	isComplete,
	isSorting,
	onAlgorithmChange,
	onSizeChange,
	onSpeedChange,
	onStart,
	onReset,
}: ControlsProps) {
	return (
		<div className='flex flex-col gap-4 p-4 bg-gray-900 border-b border-gray-800'>
			<div className='flex flex-wrap gap-3 items-center justify-center md:justify-start'>
				<select
					value={selectedAlgorithm}
					onChange={(e) => onAlgorithmChange(e.target.value as SortingAlgorithm)}
					className='px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors'
				>
					{Object.entries(sortingAlgorithms).map(([key, algo]) => (
						<option key={key} value={key}>
							{algo.name}
						</option>
					))}
				</select>
				<button
					onClick={onStart}
					disabled={isComplete || isSorting}
					className={cn(
						'px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
						(isComplete || isSorting) && 'opacity-50'
					)}
				>
					Start
				</button>
				<button
					onClick={onReset}
					className='px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm font-medium transition-colors'
				>
					Reset
				</button>
			</div>
			<div className='flex flex-wrap gap-6 items-center'>
				<div className='flex-1 min-w-[150px] md:min-w-[200px]'>
					<label className='block text-sm font-medium text-gray-300 mb-2'>
						Array Size: {arraySize}
					</label>
					<input
						type='range'
						min='10'
						max='400'
						value={arraySize}
						onChange={(e) => onSizeChange(Number(e.target.value))}
						className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:hover:bg-indigo-600 [&::-webkit-slider-thumb]:transition-colors'
					/>
				</div>
				<div className='flex-1 min-w-[150px] md:min-w-[200px]'>
					<label className='block text-sm font-medium text-gray-300 mb-2'>Speed: {speed}ms</label>
					<input
						type='range'
						min='1'
						max='50'
						value={speed}
						onChange={(e) => onSpeedChange(Number(e.target.value))}
						className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:hover:bg-indigo-600 [&::-webkit-slider-thumb]:transition-colors'
					/>
				</div>
			</div>
		</div>
	)
}
