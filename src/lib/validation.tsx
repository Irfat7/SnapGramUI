export const nameValidate = (errors) => {
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

export const passwordValidate = (errors, value) => {
    if (errors.password?.type === "required") {
        return "Password is required"
    }
    if (errors.password?.type === "validate") {
        return "Minimum length of 6 with alphanumeric"
    }
    
}

