import { GrClose } from 'react-icons/gr'

interface ICardProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const Card = ({
  children,
  onClose,
  className,
}: ICardProps) => {
  return (
    <div
      className={`
        flex flex-col p-6 bg-white border border-gray-200 shadow
        ${className}
      `}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      { onClose && (
        <div className='flex justify-end'>
          <button
            type='button'
            className='hover:opacity-50 transition-opacity duration-100 ease-in-out'
            onClick={() => {
              onClose()
            }}
          >
            <GrClose />
          </button>
        </div>
      ) }
      { children }
    </div>
  )
}

export default Card
