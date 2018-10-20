const validations = {
  isEmail: value => value
    && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    && ('Not a valid email.'),

  isPhoneNumber: value => value
    && !/^(0|[1-9][0-9]{9})$/i.test(value)
    && ('Not a valid phone number'),

  isRequired: value => !value
    && ('Required.'),
}

export default validations
