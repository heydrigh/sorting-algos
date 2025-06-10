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
		<div className='flex flex-col gap-2 p-2 md:p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
			<div className='flex flex-wrap gap-2 items-center justify-center md:justify-start'>
				<select
					value={selectedAlgorithm}
					onChange={(e) => onAlgorithmChange(e.target.value as SortingAlgorithm)}
					className='px-2 py-1 md:px-3 md:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
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
						'px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed',
						(isComplete || isSorting) && 'opacity-50'
					)}
				>
					Start
				</button>
				<button
					onClick={onReset}
					className='px-3 py-1 md:px-4 md:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm'
				>
					Reset
				</button>
			</div>
			<div className='flex flex-wrap gap-4 items-center'>
				<div className='flex-1 min-w-[150px] md:min-w-[200px]'>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Array Size: {arraySize}
					</label>
					<input
						type='range'
						min='10'
						max='400'
						value={arraySize}
						onChange={(e) => onSizeChange(Number(e.target.value))}
						className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer'
					/>
				</div>
				<div className='flex-1 min-w-[150px] md:min-w-[200px]'>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Speed: {speed}ms
					</label>
					<input
						type='range'
						min='1'
						max='50'
						value={speed}
						onChange={(e) => onSpeedChange(Number(e.target.value))}
						className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer'
					/>
				</div>
			</div>
		</div>
	)
}
