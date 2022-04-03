import { Fragment, useState, useEffect, useRef } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function usePrevious(values) {
  const ref = useRef(values)

  useEffect(() => {
    ref.current = values
  })
  return ref.current
}

export default function ComboboxInput({ label, className, url, ...props }) {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  const prevValues = usePrevious(query)

  useEffect(() => {
    if (prevValues !== query && query !== '') {
      fetchApi()
    }
  }, [query])

  useEffect(() => {
    fetchApi()
  }, [])

  function fetchApi() {
    fetch(`${url}?search=${query.toLowerCase().replace(/\s+/g, '')}`)
      .then((response) => response.json())
      .then((data) => setData(data))
  }

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <Combobox {...props}>
        <div className="relative mt-1">
          <div className="relative block w-full text-left border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
            <Combobox.Input
              className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.length === 0 && query !== '' ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">Nada Encontrado.</div>
              ) : (
                data.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-white bg-indigo-600' : 'text-gray-900'}`
                    }
                    value={person}
                    disabled={person.unavailable}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'} ${person.unavailable ? 'opacity-75' : ''}`}>
                          {person.name}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-600'}`}>
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
