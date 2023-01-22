import { useContext, useEffect, useId, useRef, useState } from 'react'
import * as Yup from 'yup'
import { FormContext } from './lib/FormContext';

type TValue = string | number | null;

interface IInput {
  value: TValue;
  label: string;
  disabled?: boolean;
  onChange?: (value: TValue) => void;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  schema?: Yup.StringSchema | Yup.NumberSchema;
}

const Input = ({
  value,
  label,
  disabled = false,
  onChange = () => {},
  type = 'text',
  placeholder = '',
  schema,
}: IInput) => {
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const [localValue, setLocalValue] = useState(value === null ? '' : String(value))
  const [validationError, setValidationError] = useState<Error | null>(null)
  const { setError, forceValidation } = useContext(FormContext);

  const checkValidation = (value: TValue, updateLocalMessage: boolean) => {
    if (schema) {
      schema.validate(value)
        .then(() => {
          setValidationError(null)
          setError(id, {
            ref: ref.current,
            message: null,
          })
        })
        .catch((error: Error) => {
          if (updateLocalMessage) {
            setValidationError(error)
          }
          setError(id, {
            ref: ref.current,
            message: error.message,
          })
        })
    }
  }

  useEffect(() => {
    setLocalValue(value === null ? '' : String(value))
  }, [value])

  useEffect(() => {
    checkValidation(value, value !== null && value !== '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (forceValidation) {
      checkValidation(value, true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceValidation])

  return (
    <div
      ref={(r) => { ref.current = r }}
      className='flex flex-col gap-1'
    >
      <div className='text-sm'>
        { label }
      </div>
      <input
        className={`
          border border-gray-300 p-1 focus:outline-none focus:ring-1 focus:ring-blue-500
          ${validationError && 'border-red-600'}
        `}
        value={localValue}
        type={type}
        onChange={(e) => {
          const newValue = e.target.value
          let newValueParsed: TValue = newValue
          if (type === 'number') {
            newValueParsed = Number(newValue)
            if (isNaN(newValueParsed)) {
              newValueParsed = null
            }
          }
          checkValidation(newValueParsed, true)
          setLocalValue(newValue)
          onChange(newValueParsed)
        }}
        disabled={disabled}
        placeholder={placeholder}
      />
      <div className='text-red-600 text-sm h-5'>
        { validationError && validationError.message }
      </div>
    </div>
  )
}

export default Input
