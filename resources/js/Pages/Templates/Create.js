import React from 'react'
import { Head, useForm } from '@inertiajs/inertia-react'
import Layout from '@/Shared/Layout'
import TextInput from '@/Shared/TextInput'
import FileInput from '@/Shared/FileInput'
import PrimaryButton from '@/Shared/PrimaryButton'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    file: '',
  })

  function create(e) {
    e.preventDefault()
    post('/templates')
  }

  return (
    <Layout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Plantilla</h2>}>
      <Head title="Crear Plantilla" />
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
              <form onSubmit={create}>
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
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <PrimaryButton loading={processing}>Crear</PrimaryButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
