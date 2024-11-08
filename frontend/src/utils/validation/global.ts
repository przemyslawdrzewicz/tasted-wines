import { ValidationRule, ValidationValue } from "@/interfaces/validation"

const validateRules = (rules: ValidationRule[], value: ValidationValue) => 
    rules
      .map((rule) => rule(value))
      .filter((message) => typeof message === 'string')

  export {validateRules}