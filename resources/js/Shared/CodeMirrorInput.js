import CodeMirror from '@uiw/react-codemirror'

export default ({ label, name, className, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <CodeMirror {...props} />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}
