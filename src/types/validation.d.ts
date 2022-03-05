declare type ValidationData = {
  value: string,
  rule?: Validator,
  invalid?: boolean
}

declare type Validator = (value: string) => ValidatateResult

declare type ValidatateResult = {
  invalid: boolean,
  message: string
}

declare type ValidateCallback = (valid: boolean, message: string) => void