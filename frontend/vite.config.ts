import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

const monoColor = '**/assets/icon/mono/*.svg?react'
const multiColor = [
  '**/assets/icon/multi*.svg?react',
  '**/assets/logo/*.svg?react',
]

export default defineConfig({
  plugins: [
    svgr({
      include: monoColor,
      svgrOptions: {
        icon: true,
        replaceAttrValues: { '#121315': 'currentColor' },
      },
    }),
    svgr({
      include: multiColor,
      svgrOptions: { icon: true },
    }),
    tailwindcss(),
  ],
})
