import React, { useState, useRef } from 'react'

const filesize = function (size) {
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

const Button = ({ text, onClick }) => (
  <button
    type="button"
    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    onClick={onClick}
  >
    {text}
  </button>
)

export default ({ className, name, label, placeHolder = 'PNG, JPG, GIF up to 10MB', accept, error, onChange }) => {
  const fileInput = useRef()
  const [file, setFile] = useState(null)

  function browse() {
    fileInput.current.click()
  }

  function remove() {
    setFile(null)
    onChange(null)
    fileInput.current.value = null
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    setFile(file)
    onChange(file)
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}
      <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${error && 'border-red-500'}`}>
        <input id={name} ref={fileInput} accept={accept} type="file" className="hidden" onChange={handleFileChange} />
        {!file && (
          <div className="space-y-1 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <Button text="Upload a file" onClick={browse} />
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">{placeHolder}</p>
          </div>
        )}
        {file && (
          <div className="flex items-center justify-between ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <div className="flex-1 pr-1">
              {file.name}
              <span className="ml-1 text-xs text-gray-600">({filesize(file.size)})</span>
            </div>
            <Button text="Remove" onClick={remove} />
          </div>
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
