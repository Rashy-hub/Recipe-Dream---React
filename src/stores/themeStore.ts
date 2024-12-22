import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DarkThemeState {
    isDarkMode: boolean
    enableDarkMode: () => void
    disableDarkMode: () => void
    toggleDarkMode: () => void
}

const useDarkTheme = create<DarkThemeState>()(
    persist(
        (set) => ({
            isDarkMode: true,
            enableDarkMode: () => set({ isDarkMode: true }),
            disableDarkMode: () => set({ isDarkMode: false }),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        {
            name: 'dark-theme-storage',
        }
    )
)

export default useDarkTheme
