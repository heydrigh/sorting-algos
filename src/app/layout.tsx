import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Sorting Visualizer with Sound | The Sound of Sorting',
	description:
		'A beautiful, interactive sorting algorithm visualizer inspired by The Sound of Sorting. Visualize, listen, and learn Bubble, Quick, Merge, Insertion, Selection, and BogoSort!',
	keywords: [
		'sorting visualizer',
		'sound of sorting',
		'sorting algorithms',
		'algorithm visualizer',
		'bubble sort',
		'quick sort',
		'merge sort',
		'insertion sort',
		'selection sort',
		'bogo sort',
		'nextjs',
		'react',
		'typescript',
		'educational',
		'interactive',
		'music',
		'visualization',
		'open source',
	],
	authors: [{ name: 'heydrigh', url: 'https://github.com/heydrigh/sorting-algos' }],
	creator: 'heydrigh',
	openGraph: {
		title: 'Sorting Visualizer with Sound | The Sound of Sorting',
		description:
			'A beautiful, interactive sorting algorithm visualizer inspired by The Sound of Sorting. Visualize, listen, and learn Bubble, Quick, Merge, Insertion, Selection, and BogoSort!',
		url: 'https://sorting-algos.onrender.com/',
		siteName: 'Sorting Visualizer',
		images: [
			{
				url: 'https://sorting-algos.onrender.com/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Sorting Visualizer Screenshot',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Sorting Visualizer with Sound | The Sound of Sorting',
		description:
			'A beautiful, interactive sorting algorithm visualizer inspired by The Sound of Sorting. Visualize, listen, and learn Bubble, Quick, Merge, Insertion, Selection, and BogoSort!',
		creator: '@heydrigh',
		images: ['https://sorting-algos.onrender.com/og-image.png'],
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-icon.png',
	},
	metadataBase: new URL('https://sorting-algos.onrender.com/'),
	alternates: {
		canonical: '/',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	)
}
