import React from 'react'
import { Head, usePage, Link } from '@inertiajs/inertia-react'
import Layout from '@/Shared/Layout'

export default function Index() {
  const { records } = usePage().props

  const { data, links } = records

  return (
    <Layout
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Registros</h2>
          <Link
            href={route('records.create')}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition"
          >
            Crear
          </Link>
        </div>
      }
    >
      <Head title="Plantillas" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-md overflow-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50">
                <tr className="font-bold text-left">
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3" colSpan="2">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ id, name, created_at }) => {
                  return (
                    <tr key={id} className="hover:bg-gray-50 focus-within:bg-gray-50">
                      <td className="border-t">
                        <Link
                          href={route('records.edit', id)}
                          className="flex items-center px-6 py-3 focus:text-indigo-700 focus:outline-none font-semibold text-gray-900"
                        >
                          {name}
                        </Link>
                      </td>
                      <td className="border-t">
                        <Link
                          href={route('records.edit', id)}
                          className="flex items-center px-6 py-3 focus:text-indigo-700 focus:outline-none font-medium text-gray-400"
                        >
                          {created_at}
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                {data.length === 0 && (
                  <tr>
                    <td className="px-6 py-4 border-t" colSpan="4">
                      No Records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
