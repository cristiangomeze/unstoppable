import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import SecondaryButton from '@/Shared/SecondaryButton'

export default function StreamContent({ url }) {
  let [isOpen, setIsOpen] = useState(false)
  let [loading, setLoading] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    setLoading(true)
  }

  return (
    <>
      <SecondaryButton type="button" onClick={openModal}>
        Vista Previa
      </SecondaryButton>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full p-8 my-8 overflow-hidden align-middle transition-all transform">
                <div>
                  {loading && (
                    <div className="fixed inset-0 flex items-center justify-center">
                      <div className="fixed inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="ml-2 text-white animate-pulse text-lg italic">Cargando...</span>
                      </div>
                      <div className="pt-20 text-md text-gray-300">
                        Está tardando demasiado, haga clic en la pantalla para cancelar o presione esc
                      </div>
                    </div>
                  )}
                  <iframe
                    className="w-full rounded-lg"
                    style={{ minHeight: '90vh' }}
                    src={url}
                    frameBorder="0"
                    onLoad={() => setLoading(false)}
                  ></iframe>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
