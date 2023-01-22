import { useEffect, useState } from "react";
import Card from "./Card";

interface IModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}

const ANIMATION_MS = 300

const Modal = ({
  children,
  open,
  onClose,
 }: IModalProps) => {
  const [rendered, setRendered] = useState(open)

  useEffect(() => {
    if (open) {
      setRendered(true)
    } else {
      setTimeout(() => {
        setRendered(false)
      }, ANIMATION_MS)
    }
  }, [open])

  if (!rendered && !open) {
    return null
  }

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex flex-column items-center justify-center transition-opacity duration-${ANIMATION_MS} ease-in-out opacity-100
        ${(!open || !rendered) && 'opacity-0 pointer-events-none'}
      `}
      onClick={() => {
        onClose && onClose()
      }}
    >
      <div style={{ width: 300 }}>
        <Card
          onClose={() => {
            onClose && onClose()
          }}
        >
          { children }
        </Card>
      </div>
    </div>
  )
}

export default Modal
