import React from 'react'

export interface IFormContextError {
  ref: HTMLElement | null;
  message: string | null;
}

export const FormContext = React.createContext({
  errors: {},
  forceValidation: false,
  hasAnyErrors: false,
  setError: (id: string, error: IFormContextError) => {},
})
