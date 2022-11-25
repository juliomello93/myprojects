import { createContext, ReactNode, useState } from "react";

interface iModalContextProps {
  children: ReactNode;
}

interface iModalContext {
  openModal(): void;
  closeModal(): void;
  isModalOpen: boolean;
}

export const ModalContext = createContext({} as iModalContext);

export const ModalProvider = ({ children }: iModalContextProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(): void {
    setIsModalOpen(true);
  }

  function closeModal(): void {
    setIsModalOpen(false);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
