import React, { useState } from 'react';
import { FormContext, IFormContextError } from './lib/FormContext';

interface IForm {
  children: React.ReactNode;
  onSubmit?: () => void;
}

const Form = ({
  children,
  onSubmit = () => {},
}: IForm) => {
  const [errors, setErrors] = useState<{ [id: string]: IFormContextError }>({})
  const [submitted, setSubmitted] = useState(false)
  const setError = (id: string, error: IFormContextError) => {
    setErrors((oldErrors) => ({
      ...oldErrors,
      [id]: error,
    }))
  }

  const hasAnyErrors = Object.keys(errors).filter((id) => errors[id].message).length > 0

  return (
    <FormContext.Provider
      value={{
        errors,
        setError,
        forceValidation: submitted,
        hasAnyErrors,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
          if (!hasAnyErrors) {
            onSubmit()
          }
        }}
      >
        { children }
      </form>
    </FormContext.Provider>
  )
}

export default Form
