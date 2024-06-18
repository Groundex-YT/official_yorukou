import { create } from 'zustand'

interface ModalStoreInterface {
    data?: any
    isOpen: boolean
    openModal: (data?: any) => void
    closeModal: (data?: any) => void
    setData: (data?: any) => void
}

const useSearchModal = create<ModalStoreInterface>((set) => ({
    data: null,
    isOpen: false,
    openModal: (data?: any) => set({ isOpen: true, data: data ? data : null }),
    closeModal: (data?: any) =>
        set({ isOpen: false, data: data ? data : null }),
    setData: (data?: any) => set({ data: data }),
}))

export default useSearchModal
