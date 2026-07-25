'use client';

import React from "react";
import {useFormContext} from "react-hook-form";
import {ClearButton, ErrorText, RequiredSymbol} from "@/components/shared";
import {Input} from "@/components/ui";

// InputHTMLAttributes - для того чтобы дать компоненту свойства HTML-тега (type, placeholder)
// <HTMLInputElement> - для того чтобы дать компоненту свойства объекта bp js (e.target.value)

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  name,
  className,
  label,
  required,
  ...props
}: Props) => {
  const {
    register,
    setValue,
    formState: {errors},
    watch
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    // после крестика без shouldValidate форма будет валидна
    setValue(name, '', {shouldValidate: true});
  }

  const clearButtonCondition = value && !props.disabled;

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md border-1" {...register(name)} {...props} />

        {clearButtonCondition && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText
        text={errorText}
        className="mt-2"
      />}
    </div>
  );
}