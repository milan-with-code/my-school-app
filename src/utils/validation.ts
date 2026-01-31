/**
 * Validation utilities for form fields
 */

export const ValidationRules = {
    // Mobile Number Validation
    mobileNumber: {
        validate: (value: string): string | null => {
            if (!value.trim()) {
                return "Mobile number is required";
            }
            // Indian phone number format (10 digits)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value.replace(/\D/g, ""))) {
                return "Enter a valid 10-digit mobile number";
            }
            return null;
        },
    },

    // Password Validation
    password: {
        validate: (value: string): string | null => {
            if (!value) {
                return "Password is required";
            }
            if (value.length < 6) {
                return "Password must be at least 6 characters";
            }
            return null;
        },
    },

    // Email Validation
    email: {
        validate: (value: string): string | null => {
            if (!value.trim()) {
                return "Email is required";
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Enter a valid email address";
            }
            return null;
        },
    },

    // Username Validation
    username: {
        validate: (value: string): string | null => {
            if (!value.trim()) {
                return "Username is required";
            }
            if (value.length < 3) {
                return "Username must be at least 3 characters";
            }
            if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                return "Username can only contain letters, numbers, hyphens, and underscores";
            }
            return null;
        },
    },
};

export type FormErrors = Record<string, string | null>;

/**
 * Validates a single field and returns error message or null
 */
export function validateField(
    fieldName: keyof typeof ValidationRules,
    value: string
): string | null {
    const validator = ValidationRules[fieldName];
    if (!validator) {
        return null;
    }
    return validator.validate(value);
}

/**
 * Validates all fields in a form object
 */
export function validateForm(
    formData: Record<string, string>,
    fieldsToValidate: Array<keyof typeof ValidationRules>
): FormErrors {
    const errors: FormErrors = {};

    fieldsToValidate.forEach((fieldName) => {
        errors[fieldName] = validateField(fieldName, formData[fieldName] || "");
    });

    return errors;
}

/**
 * Check if form has any errors
 */
export function hasFormErrors(errors: FormErrors): boolean {
    return Object.values(errors).some((error) => error !== null);
}
