"use client"

import { ErrorMessage, Field } from "formik";
import { InputProps } from "../@types/Input";

export function Input({ name, label, type, required, ...props }: InputProps) {
    return (
        <div className="flex flex-col">
            <div className="capitalize">
                {label || name} <span className="text-red-500">{required && "*"}</span>
            </div>
            <Field name={name} type={type} {...props} className="p-2 rounded border-zinc-400 border border-solid outline-0" />

            <div className="text-red-500 text-xs mt-1">
                <ErrorMessage name={name} />
            </div>
        </div>
    );
}