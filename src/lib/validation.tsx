import { INewUser } from "@/types"
import { FieldErrors } from "react-hook-form"

export const nameValidate = (errors: FieldErrors<INewUser>) => {
    if (errors.name?.type === "required") {
        return "Name is required"
    }
    else if (errors.name?.type === "minLength") {
        return "At least 3 characters"
    }
    else if (errors.name?.type === "maxLength") {
        return "At most 12 characters"
    }

    return ''
}

export const passwordValidate = (errors: FieldErrors<INewUser>) => {
    if (errors.password?.type === "required") {
        return "Password is required"
    }
    if (errors.password?.type === "validate") {
        return "Minimum length of 8 with alphanumeric"
    }
}

export const userNameValidate = (errors: FieldErrors<INewUser>) => {
    if (errors.userName?.type === "required") {
        return "Username is required"
    }
    if (errors.userName?.type === "validate") {
        return "Username already exists"
    }
}

