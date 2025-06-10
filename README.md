# Sorting Visualizer with Sound 🎵

A beautiful, interactive sorting algorithm visualizer inspired by [The Sound of Sorting](https://panthema.net/2013/sound-of-sorting/). Visualize, listen, and learn how classic sorting algorithms work—right in your browser!

---

## ✨ Features

- 🎶 **Sound**: Hear the sorting process in real time
- 📊 **Visual**: Animated bars for each array element
- 🔀 **Multiple Algorithms**: Bubble, Quick, Merge, Insertion, Selection, BogoSort (for fun!)
- 🕹️ **Controls**: Play, pause, reset, change speed and array size
- 🖥️ **Responsive**: Works on desktop and mobile
- 🧑‍💻 **Code Display**: See the algorithm code as it runs
- 🌙 **Dark Mode**: Beautiful by default

---

## 🚀 Demo

[Live Demo](https://sorting-algos.onrender.com)

---

## 🛠️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/heydrigh/sorting-algos.git
cd sorting-algos
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Run locally
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ➕ Adding a New Algorithm

1. Create a new file in `src/lib/sorting/` (e.g. `radix.ts`).
2. Export a generator function and an info object with a `code` string:
   ```ts
   export function* radixSort(arr: number[]): Generator<SortStep, void, unknown> { /* ... */ }
   export const radixSortInfo = { name: 'Radix Sort', description: '...', code: `function radixSort(...) { ... }` }
   ```
3. Add it to `src/lib/sorting/index.ts`:
   ```ts
   import { radixSort, radixSortInfo } from './radix'
   // ...
   export const sortingAlgorithms = {
     ...,
     radix: { ...radixSortInfo, generator: radixSort },
   }
   ```
4. Done! It will appear in the UI automatically.

---

## 🧰 Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

---

## 🙏 Credits
- Inspired by [The Sound of Sorting](https://panthema.net/2013/sound-of-sorting/)
- Built by [heydrigh](https://github.com/heydrigh/sorting-algos)

---

## 📄 License
[MIT](LICENSE)
