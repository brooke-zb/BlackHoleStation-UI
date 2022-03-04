function emailValidator(value: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(String(value))
}

function and(...validators: Array<(value: string) => boolean>) {
  return (value: string) => validators.every(validator => validator(value))
}

function or(...validators: Array<(value: string) => boolean>) {
  return (value: string) => validators.some(validator => validator(value))
}

function isEmptyValidator(value: string) {
  return value.length === 0
}

function notEmptyValidator(value: string) {
  return value.length > 0
}

function getMinLengthValidator(length: number) {
  return (value: string) => value.length >= length
}

function getMaxLengthValidator(length: number) {
  return (value: string) => value.length <= length
}

function getLengthRangeValidator(min: number, max: number) {
  return (value: string) => value.length >= min && value.length <= max
}

function validate(data: Record<string, ValidationData>, callback?: (valid: boolean, message: string) => void) {
  let isValid = true
  let message = ''
  for (let key in data) {
    if (data[key].rule && data[key].invalid !== undefined) {
      // @ts-ignore
      data[key].invalid = !data[key].rule(data[key].value)
      if (data[key].invalid) {
        isValid = false
        message += `${ data[key].message || key + '值验证失败' }\n`
      }
    }
  }
  if (callback) {
    callback(isValid, message)
  }
}

export {
  emailValidator,
  and,
  or,
  isEmptyValidator,
  notEmptyValidator,
  getMinLengthValidator,
  getMaxLengthValidator,
  getLengthRangeValidator,
  validate,
}