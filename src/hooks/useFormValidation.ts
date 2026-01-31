import React from "react";
import { validateField, FormErrors, ValidationRules } from "@/utils/validation";

interface UseFormValidationOptions {
    onFieldChange?: (fieldName: string, value: string) => void;
    validateOnChange?: boolean;
}

/**
 * Custom hook for form validation with optimized re-renders
 * Uses useCallback and useRef to prevent unnecessary updates
 */
export function useFormValidation<T extends Record<string, string>>(
    initialState: T,
    options: UseFormValidationOptions = {}
) {
    const { onFieldChange, validateOnChange = true } = options;

    // Store form values in a ref to avoid re-renders on every change
    const formValuesRef = React.useRef<T>(initialState);
    const [formValues, setFormValues] = React.useState<T>(initialState);

    // Store errors separately to manage them independently
    const [errors, setErrors] = React.useState<FormErrors>({});

    // Track which fields have been touched
    const [touchedFields, setTouchedFields] = React.useState<Set<string>>(
        new Set()
    );

    /**
     * Update a single field value and optionally validate
     */
    const updateField = React.useCallback(
        (fieldName: keyof T, value: string) => {
            // Update ref (doesn't trigger re-render)
            formValuesRef.current = {
                ...formValuesRef.current,
                [fieldName]: value,
            };

            // Update state for UI
            setFormValues((prev) => ({
                ...prev,
                [fieldName]: value,
            }));

            // Mark field as touched
            setTouchedFields((prev) => {
                const newSet = new Set(prev);
                newSet.add(String(fieldName));
                return newSet;
            });

            // Call external onChange if provided
            onFieldChange?.(String(fieldName), value);

            // Validate on change if enabled
            if (validateOnChange && String(fieldName) in ValidationRules) {
                const error = validateField(
                    String(fieldName) as keyof typeof ValidationRules,
                    value
                );
                setErrors((prev) => ({
                    ...prev,
                    [fieldName]: error,
                }));
            }
        },
        [validateOnChange, onFieldChange]
    );

    /**
     * Validate a specific field
     */
    const validateSingleField = React.useCallback(
        (fieldName: keyof T) => {
            if (String(fieldName) in ValidationRules) {
                const error = validateField(
                    String(fieldName) as keyof typeof ValidationRules,
                    formValuesRef.current[fieldName] || ""
                );
                setErrors((prev) => ({
                    ...prev,
                    [fieldName]: error,
                }));
                return error;
            }
            return null;
        },
        []
    );

    /**
     * Validate all fields in the form
     */
    const validateAllFields = React.useCallback(
        (fieldsToValidate: Array<keyof T>) => {
            const newErrors: FormErrors = {};
            let hasErrors = false;

            fieldsToValidate.forEach((fieldName) => {
                if (String(fieldName) in ValidationRules) {
                    const error = validateField(
                        String(fieldName) as keyof typeof ValidationRules,
                        formValuesRef.current[fieldName] || ""
                    );
                    newErrors[String(fieldName)] = error;
                    if (error) hasErrors = true;
                }
            });

            setErrors(newErrors);
            return !hasErrors;
        },
        []
    );

    /**
     * Mark field as touched
     */
    const touchField = React.useCallback((fieldName: keyof T) => {
        setTouchedFields((prev) => {
            const newSet = new Set(prev);
            newSet.add(String(fieldName));
            return newSet;
        });
    }, []);

    /**
     * Reset form to initial state
     */
    const resetForm = React.useCallback(() => {
        formValuesRef.current = initialState;
        setFormValues(initialState);
        setErrors({});
        setTouchedFields(new Set());
    }, [initialState]);

    /**
     * Get current form values from ref (no re-render needed)
     */
    const getFormValues = React.useCallback(() => {
        return formValuesRef.current;
    }, []);

    return {
        formValues,
        errors,
        touchedFields,
        updateField,
        validateSingleField,
        validateAllFields,
        touchField,
        resetForm,
        getFormValues,
    };
}

// Re-export validation utilities
export { validateField, ValidationRules, hasFormErrors } from "@/utils/validation";
export type { FormErrors } from "@/utils/validation";
