import React from 'react'

export default ({ label, name, className, children, error, ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
          {label} {props.required && <span className="text-red-600">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        {...props}
        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md 
          ${error ? 'border-red-500' : ''}
          ${props.readOnly ? 'bg-gray-50' : ''}
        `}
      >
        {props.readOnly && <option>{props.value}</option>}

        {!props.readOnly && children}
      </select>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
