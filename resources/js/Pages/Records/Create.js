import React, { useState, useEffect, useRef } from 'react'
import Layout from '@/Shared/Layout'
import { Head, usePage, useForm } from '@inertiajs/inertia-react'
import ComboboxInput from '@/Shared/ComboboxInput'
import SectionBorder from '@/Shared/SectionBorder'
import TextInput from '@/Shared/TextInput'
import SelectInput from '@/Shared/SelectInput'
import PrimaryButton from '@/Shared/PrimaryButton'
import isEmpty from 'lodash/isEmpty'

export default function Create() {
  const [template, setTemplate] = useState()

  const { data, setData, transform, post, processing, errors } = useForm({})

  useEffect(() => {
    if (template) {
      let inputs = {}

      template.fields.map((field) => {
        inputs[field.name] = ''
      })

      setData(inputs)
    }
  }, [template])

  transform((data) => ({
    template_id: template.id,
    fields: data,
  }))

  function create(e) {
    e.preventDefault()

    post(route('records.store'))
  }

  return (
    <Layout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Registro</h2>}>
      <Head title="Crear Registro" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Buscar Plantilla</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6 shadow sm:rounded-md">
                  <div className="grid grid-cols-6 gap-6">
                    <ComboboxInput
                      value={template}
                      onChange={setTemplate}
                      label="Plantilla a utilizar"
                      className="col-span-6 sm:col-span-4"
                      url={'/monolith-api/templates'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SectionBorder />

          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Informacion a completar</h3>
                <p className="mt-1 text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={create} className="bg-white shadow sm:rounded-md overflow-hidden">
                <div className="px-4 py-5 space-y-6  sm:p-6">
                  {template &&
                    !isEmpty(data) &&
                    template.fields.map((field, key) => {
                      return (
                        <div className="grid grid-cols-6 gap-6" key={key}>
                          {['text', 'date', 'number', 'hidden'].includes(field.type) && (
                            <TextInput
                              className="col-span-6 sm:col-span-4"
                              label={field.settings.label ? field.settings.label : field.name}
                              type={field.type}
                              required={field.attributes.includes('required')}
                              readOnly={field.attributes.includes('readOnly')}
                              value={data[field.name]}
                              onChange={(e) => setData(field.name, e.target.value)}
                            />
                          )}

                          {'select' == field.type && (
                            <SelectInput
                              className="col-span-6 sm:col-span-4"
                              label={field.settings.label ? field.settings.label : field.name}
                              required={field.attributes.includes('required')}
                              readOnly={field.attributes.includes('readOnly')}
                              value={data[field.name]}
                              onChange={(e) => setData(field.name, e.target.value)}
                            >
                              <option />
                              {field.settings.select.map((option, key) => (
                                <option key={key}>{option}</option>
                              ))}
                            </SelectInput>
                          )}
                        </div>
                      )
                    })}
                </div>
                {template && (
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <PrimaryButton loading={processing} type="submit">
                      Crear
                    </PrimaryButton>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
