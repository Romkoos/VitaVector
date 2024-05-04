'use client'
import { forwardRef } from 'react'

import classNames from 'classnames'

interface InputFieldProps {
	id: string
	label?: string
	extra?: string
	placeholder: string
	variant?: string
	state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{ label, id, extra, type, placeholder, state, disabled, isNumber, ...rest },
		ref
	) => {
		const getFieldCssClasses = (extra = '', disabled = false, state = '') => {
			const paddingMatch = extra.match(/p-\d+/)
			// Если класс найден, используем его, иначе применяем 'p-3'
			const paddingClass = paddingMatch ? paddingMatch[0] : 'p-3'

			// Определяем класс mt, если в extra нет 'mt-'
			const mtClass = extra.includes('mt-') ? '' : 'mt-2'
			const disabledClass = disabled
				? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
				: ''
			const errorClass =
				state === 'error'
					? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
					: ''
			const successClass =
				state === 'success'
					? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
					: ''

			// Использование classNames для сборки финального набора классов
			return classNames(
				'flex w-full items-center justify-center rounded-lg border border-border bg-white/0 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors',
				mtClass,
				paddingClass,
				{
					[disabledClass]: disabled,
					[errorClass]: state === 'error',
					[successClass]: state === 'success'
				}
			)
		}
		return (
			<div className={`${extra}`}>
				{label && (
					<label
						htmlFor={id}
						className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
					>
						{label}
					</label>
				)}

				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder}
					className={getFieldCssClasses(extra, disabled, state)}
					onKeyDown={event => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault()
						}
					}}
					{...rest}
				/>
			</div>
		)
	}
)

Field.displayName = 'field'
