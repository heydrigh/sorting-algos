import { BarProps } from './types'

export default function Bar({ value, isActive, width, maxValue }: BarProps) {
	const height = (value / maxValue) * 100

	return (
		<div
			className={`flex-1 min-w-[2px] max-w-[12px] transition-all duration-100 ${
				isActive ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-400 dark:bg-gray-600'
			}`}
			style={{
				height: `${height}%`,
				width: `${width}%`,
				minWidth: '2px',
			}}
		/>
	)
}
