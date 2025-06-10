import { useRef } from 'react'

export function useAudio() {
	const audioContextRef = useRef<AudioContext | null>(null)

	const playNote = (frequency: number) => {
		try {
			if (!audioContextRef.current) {
				audioContextRef.current = new AudioContext()
			}

			const oscillator = audioContextRef.current.createOscillator()
			const gainNode = audioContextRef.current.createGain()

			oscillator.type = 'sine'
			oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
			gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
			gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1)

			oscillator.connect(gainNode)
			gainNode.connect(audioContextRef.current.destination)

			oscillator.start()
			oscillator.stop(audioContextRef.current.currentTime + 0.1)
		} catch (error) {
			console.error('Error playing audio:', error)
		}
	}

	return { playNote }
}
