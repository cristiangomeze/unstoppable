import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Head, useForm, usePage } from '@inertiajs/inertia-react'
import Layout from '@/Shared/Layout'
import TextInput from '@/Shared/TextInput'
import FileInput from '@/Shared/FileInput'
import PrimaryButton from '@/Shared/PrimaryButton'
import Attachment from '@/Shared/Attachment'
import SectionBorder from '@/Shared/SectionBorder'
import StreamContent from '@/Shared/StreamContent'
import ActionMessage from '@/Shared/ActionMessage'
import CreateField from './CreateField'
import UpdateField from './UpdateField'
import { TrashIcon } from '@heroicons/react/outline'

export default function Edit() {
  const { template, attachments } = usePage().props
  const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
    name: template.name,
    file: template.file,
  })

  function update(e) {
    e.preventDefault()
    put(route('templates.update', template))
  }

  function destroy(id) {
    if (confirm('¿Está seguro de que desea eliminar este campo?')) {
      Inertia.delete(`/templates/${template.id}/fields/${id}`, {
        preserveScroll: true,
      })
    }
  }

  return (
    <Layout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Plantilla: {template.name}</h2>}>
      <Head title="Actualizar Plantilla" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Plantilla</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={update}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <TextInput
                        className="col-span-3 sm:col-span-2"
                        label="Nombre"
                        type="text"
                        error={errors.name}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                      />
                    </div>

                    <FileInput
                      className="col-span-3 sm:col-span-2"
                      label="Plantilla"
                      name="file"
                      accept=".docx"
                      placeHolder="DOCX up to 10MB"
                      error={errors.file}
                      value={data.file}
                      onChange={(e) => setData('file', e)}
                    />

                    <Attachment attachments={attachments} />
                  </div>
                  <div className="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                    <ActionMessage on={recentlySuccessful} className="mr-2">
                      Actualizado.
                    </ActionMessage>

                    <StreamContent url={`/templates/${template.id}/preview`} />

                    <PrimaryButton type="submit" loading={processing}>
                      Actualizar
                    </PrimaryButton>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <SectionBorder />

          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Campos</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  {template.fields.length == 0 && <h3 className="text-lg font-medium text-gray-900">No tiene campos agregados a esta plantilla.</h3>}
                  <div className="mt-3 max-w-xl text-sm text-gray-600">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, vero incidunt id numquam deleniti, illum reiciendis optio esse
                      libero minima minus. Exercitationem, quos consequuntur error nihil unde quasi soluta rerum!
                    </p>
                  </div>

                  {template.fields.length >= 1 && (
                    <div className="mt-3">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="border-b border-slate-200">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-slate-900">
                                Campo
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-slate-900">
                                Tipo
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-slate-900">
                                Atributos
                              </th>
                              <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Acciones</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {template.fields.map((field, key) => {
                              return (
                                <tr key={key}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{field.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{field.type.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-medium flex-col">
                                    {field.attributes.name.map((attribute, key) => {
                                      return <div key={key}>{attribute}</div>
                                    })}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    <div className="flex justify-end space-x-4">
                                      <UpdateField field={field} />
                                      <button
                                        onClick={() => destroy(field.id)}
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 inline-flex items-center"
                                      >
                                        <TrashIcon className="h-4 w-4 mr-1" />
                                        Eliminar
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    <CreateField />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
