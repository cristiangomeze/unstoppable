import { Dialog, Transition } from '@headlessui/react'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Fragment, useState } from 'react'
import PrimaryButton from '@/Shared/PrimaryButton'
import SecondaryButton from '@/Shared/SecondaryButton'
import TextInput from '@/Shared/TextInput'
import ListboxInput from '@/Shared/ListboxInput'
import CodeMirrorInput from '@/Shared/CodeMirrorInput'
import ActionMessage from '@/Shared/ActionMessage'
import { json } from '@codemirror/lang-json'

export default function ModalCreateField({ ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const { types, attributes, template } = usePage().props
  const [checkedState, setCheckedState] = useState(new Array(attributes.length).fill(false))

  const { data, setData, post, processing, reset, errors, clearErrors, setError, recentlySuccessful } = useForm({
    name: '',
    type: '',
    attributes: '',
    settings: '{}',
  })

  const handleOnChangeAttributes = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item))

    setCheckedState(updatedCheckedState)

    const attributesChecked = updatedCheckedState
      .map((currentState, index) => {
        return currentState === true ? attributes[index].id : false
      })
      .filter(Boolean)

    setData('attributes', attributesChecked)
  }

  function closeModal() {
    setIsOpen(false)
    clearErrors()
    reset()
  }

  function openModal() {
    setIsOpen(true)
  }

  function create(e) {
    e.preventDefault()

    try {
      JSON.parse(data.settings, null, '')

      post(`/templates/${template.id}/fields`, {
        preserveScroll: true,
        onSuccess: () => closeModal(),
      })
    } catch (error) {
      setError('settings', error.toString())
    }
  }

  return (
    <>
      <div className="flex items-center">
        <ActionMessage on={recentlySuccessful} className="mr-2">
          Guardado.
        </ActionMessage>
        <PrimaryButton onClick={openModal}>Nuevo</PrimaryButton>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
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
              <form
                onSubmit={create}
                className="inline-block w-full sm:max-w-2xl text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
              >
                <div className="px-6 py-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Nuevo Campo
                  </Dialog.Title>

                  <div className="my-4 space-y-4">
                    <TextInput
                      className="w-2/3"
                      label="Nombre"
                      type="text"
                      error={errors.name}
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                    />

                    <ListboxInput
                      className="w-2/3"
                      label="Tipo"
                      error={errors.type}
                      options={types}
                      value={data.type}
                      onChange={(e) => setData('type', e.id)}
                    />

                    <div className="flex-col">
                      {attributes.map(({ id, name }, index) => {
                        return (
                          <div key={index}>
                            <label className="inline-flex items-center">
                              <input
                                id={index}
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                                value={id}
                                checked={checkedState[index]}
                                onChange={() => handleOnChangeAttributes(index)}
                              />
                              <span className="ml-2">{name}</span>
                            </label>
                          </div>
                        )
                      })}
                    </div>

                    <CodeMirrorInput
                      label="Ajustes"
                      height="200px"
                      extensions={[json()]}
                      value={data.settings}
                      error={errors.settings || errors['settings.label'] || errors['settings.select'] || errors['settings.transforms']}
                      onChange={(e) => setData('settings', e)}
                    />
                  </div>
                </div>

                <div className="rounded-b-lg flex flex-row justify-end px-6 py-4 bg-gray-100 text-right">
                  <SecondaryButton type="button" onClick={closeModal}>
                    Cancelar
                  </SecondaryButton>

                  <PrimaryButton loading={processing} type="submit">
                    Confirmar
                  </PrimaryButton>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
