import { ValidationValue } from "@/interfaces/validation"
const requiredRule = (value: ValidationValue) => !!value || 'Field is required'

export {requiredRule}