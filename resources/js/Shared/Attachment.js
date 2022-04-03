export default function Attachment({ attachments = [] }) {
  return (
    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
      {attachments.map(({ name, url }, key) => {
        return (
          <li key={key} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
            <div className="w-0 flex-1 flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 flex-1 w-0 truncate">{name}</span>
            </div>
            <div className="ml-4 flex-shrink-0">
              <a href={url} className="font-medium text-indigo-600 hover:text-indigo-500">
                Download
              </a>
            </div>
          </li>
        )
      })}

      {attachments.length === 0 && <li className="pl-3 pr-4 py-3 text-center text-sm">No attachments found.</li>}
    </ul>
  )
}
