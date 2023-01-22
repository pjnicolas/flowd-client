import * as Yup from 'yup'

export const YupRequiredString = Yup.string()
  .required('Required field')
  .typeError('Required field')

export const YupRequiredNumber = Yup.number()
  .required('Required field')
  .typeError('Required field')

export const YupRequiredDate = Yup.date()
  .required('Required field')
  .typeError('Required field')

export const YupRequiredBoolean = Yup.boolean()
  .required('Required field')
  .typeError('Required field')

export const YupRequiredArray = Yup.array()
  .required('Required field')
  .typeError('Required field')

export const YupRequiredObject = Yup.object()
  .required('Required field')
  .typeError('Required field')

export const YupRequiredEmail = Yup.string()
  .email('Invalid email')
  .required('Required field')
  .typeError('Required field')

export const YupRequiredUrl = Yup.string()
  .url('Invalid URL')
  .required('Required field')
  .typeError('Required field')

export const YupRequiredUuid = Yup.string()
  .matches(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    'Invalid UUID'
  )
  .required('Required field')
  .typeError('Required field')

export const YupRequiredColor = Yup.string()
  .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color')
  .required('Required field')
  .typeError('Required field')

export const YupRequiredPassword = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Required field')
  .typeError('Required field')
