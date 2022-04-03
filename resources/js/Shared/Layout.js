import { Link, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import NavLink from '@/Shared/NavLink'
import Dropdown from '@/Shared/Dropdown'

export default function Layout({ header, children }) {
  const { user, jetstream } = usePage().props

  function switchToTeam(team) {
    Inertia.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
        replace: true,
      },
    )
  }

  return (
    <div className="font-sans antialiased">
      <div id="modal"></div>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="shrink-0 flex items-center">
                    <Link href={route('dashboard')}>
                      <svg className="block h-9 w-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.395 44.428C4.557 40.198 0 32.632 0 24 0 10.745 10.745 0 24 0a23.891 23.891 0 0113.997 4.502c-.2 17.907-11.097 33.245-26.602 39.926z"
                          fill="#6875F5"
                        />
                        <path
                          d="M14.134 45.885A23.914 23.914 0 0024 48c13.255 0 24-10.745 24-24 0-3.516-.756-6.856-2.115-9.866-4.659 15.143-16.608 27.092-31.75 31.751z"
                          fill="#6875F5"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                      Dashboard
                    </NavLink>
                    <NavLink
                      href={route('records')}
                      active={route().current('records') || route().current('records.create') || route().current('records.edit')}
                    >
                      Registros
                    </NavLink>
                    <NavLink
                      href={route('templates')}
                      active={route().current('templates') || route().current('templates.create') || route().current('templates.edit')}
                    >
                      Plantillas
                    </NavLink>
                  </div>
                </div>

                <div className="hidden sm:flex sm:items-center sm:ml-6">
                  {/* Team Dropdown */}
                  <div className="ml-3 relative">
                    {jetstream.hasTeamFeatures && (
                      <Dropdown align="right" width="60">
                        <Dropdown.Trigger>
                          <span className="inline-flex rounded-md">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition"
                            >
                              {user.current_team.name}

                              <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                          <div className="w-60">
                            <div>
                              <div className="block px-4 py-2 text-xs text-gray-400">Manage Team</div>

                              <Dropdown.ExternalLink href={route('teams.show', user.current_team)}>Team Settings</Dropdown.ExternalLink>

                              {jetstream.canCreateTeams && (
                                <Dropdown.ExternalLink href={route('teams.create')}>Create New Team</Dropdown.ExternalLink>
                              )}

                              <div className="border-t border-gray-100" />

                              <div className="block px-4 py-2 text-xs text-gray-400">Switch Teams</div>

                              {user.all_teams.map((team) => {
                                return (
                                  <button
                                    type="button"
                                    key={team.id}
                                    onClick={() => switchToTeam(team)}
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                  >
                                    <div className="flex items-center">
                                      {team.id == user.current_team_id && (
                                        <svg
                                          className="mr-2 h-5 w-5 text-green-400"
                                          fill="none"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      )}
                                      <div>{team.name}</div>
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        </Dropdown.Content>
                      </Dropdown>
                    )}
                  </div>

                  {/* Settings Dropdown */}
                  <div className="ml-3 relative">
                    <Dropdown align="right" width="48">
                      <Dropdown.Trigger>
                        {jetstream.managesProfilePhotos && (
                          <button class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                            <img class="h-8 w-8 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
                          </button>
                        )}

                        {!jetstream.managesProfilePhotos && (
                          <span className="inline-flex rounded-md">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
                            >
                              Cristian Gomez
                              <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </span>
                        )}
                      </Dropdown.Trigger>

                      <Dropdown.Content>
                        <div className="block px-4 py-2 text-xs text-gray-400">Manage Account</div>

                        <Dropdown.ExternalLink href={route('profile.show')}>Profile</Dropdown.ExternalLink>

                        {jetstream.hasApiFeatures && <Dropdown.ExternalLink href={route('api-tokens.index')}>API Tokens</Dropdown.ExternalLink>}

                        <div class="border-t border-gray-100" />

                        <Dropdown.Link href={route('logout')} method="post">
                          Log Out
                        </Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                </div>

                {/* Hamburger */}
                <div className="-mr-2 flex items-center sm:hidden">
                  <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition"></button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {header && (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </div>
  )
}
