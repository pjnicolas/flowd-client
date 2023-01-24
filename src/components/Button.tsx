import Spinner from './Spinner';

interface IButtonProps {
  label?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: boolean;
  danger?: boolean;
  size?: 'none' | 'full' | 'sm' | 'md' | 'lg' | 'xl';
}

const Button = ({
  label,
  icon,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  text = false,
  danger = false,
  size = 'none',
}: IButtonProps) => {
  let bgClass = ''
  let hoverBgClass = ''
  let textClass = ''

  if (text) {
    bgClass = 'bg-transparent'
    hoverBgClass = 'hover:bg-gray-200'
    textClass = danger ? 'text-red-500' : 'text-blue-500'
  } else {
    bgClass = danger ? 'bg-red-500' : 'bg-blue-500'
    hoverBgClass = danger ? 'hover:bg-red-700' : 'hover:bg-blue-700'
    textClass = 'text-white'
  }

  if (loading || disabled) {
    hoverBgClass = ''
  }

  return (
    <button
      className={`
        font-bold py-2 px-4 flex flex-row gap-4 items-center transition duration-100 ease-in-out justify-center
        ${bgClass} ${hoverBgClass} ${textClass}
        ${ size === 'sm' && 'w-24' }
        ${ size === 'md' && 'w-32' }
        ${ size === 'lg' && 'w-48' }
        ${ size === 'xl' && 'w-64' }
        ${ size === 'full' && 'w-full' }
      `}
      type={type}
      disabled={disabled || loading}
      onClick={() => {
        if (!disabled && !loading) {
          onClick && onClick()
        }
      }}
    >
      { loading && <Spinner /> }
      { icon }
      { label }
    </button>
  )
}

export default Button
