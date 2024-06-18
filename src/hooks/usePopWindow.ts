import { Media } from '@/types/anilist'
import { ElementType } from '@react-spring/web'
import { create } from 'zustand'

interface ModalStoreInterface {
    JSX_Element?: ElementType
    data?: any
    isOpen: boolean
    openModal: (JSX_Element: ElementType, data?: any) => void
    closeModal: () => void
}

const usePopWindow = create<ModalStoreInterface>((set) => ({
    JSX: undefined,
    data: null,
    isOpen: false,
    openModal: (JSX_Element: ElementType, data?: any) =>
        set({ isOpen: true, JSX_Element, data: data ? data : null }),
    closeModal: () => set({ isOpen: false, JSX_Element: undefined }),
}))

export default usePopWindow
