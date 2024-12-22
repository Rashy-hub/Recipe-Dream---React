import React from 'react'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
    label?: string
    name: string
    placeholder?: string
    divstyle?: string
    type?: string
    defaultValue?: string
}

const FormInput: React.FC<FormInputProps> = ({ label, name, placeholder, divstyle = 'mb-4', type = 'text', defaultValue = '' }) => {
    const methods = useFormContext()
    const {
        register,
        formState: { errors },
    } = methods

    return (
        <div className={divstyle}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-amber-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                defaultValue={defaultValue}
                {...register(name)}
                className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-900"
                placeholder={placeholder}
            />
            {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]?.message?.toString()}</p>}
        </div>
    )
}

export default FormInput
