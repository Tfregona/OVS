import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon, MenuIcon} from "@heroicons/react/outline";
import avatarA from "../../images/avatarA.gif";

const navigationPublic = [
  { name: "Posts", href: "/posts", current: false },
  { name: "Sports", href: "/sports", current: false },
];

const navigationPrivate = [
  { name: "Posts", href: "/posts", current: false },
  { name: "Sports", href: "/sports", current: false },
  { name: "Chat", href: "/chat", current: false },
];

const navigationPrivateRight = [
  { name: "Publier une annonce", href: "/createpost", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const [Cookies,, removeCookies] = useCookies(["token", "role", "id", "username", "chat", "idchat"]);

  const logOut = () => {
    removeCookies('token');
    removeCookies('role');
    removeCookies('id');
    removeCookies('username');
    removeCookies('chat');
    removeCookies('idchat');
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* NavBar sm-screen */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="block lg:hidden h-10 w-auto"
                      src="https://zupimages.net/up/22/05/l1ew.png"
                      alt="Logo OVS"
                    />
                    <img
                      className="hidden lg:block h-10 w-auto"
                      src="https://zupimages.net/up/22/05/l1ew.png"
                      alt="Logo OVS"
                    />
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {/* Token */}
                    {Cookies.token
                      ? navigationPrivate.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))
                      : navigationPublic.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                    {/* End Token */}
                  </div>
                </div>
              </div>
              {/* End Navbar sm-screen*/}

              {/*Nav right*/}
              {Cookies.token ? (
                <div className="hidden sm:block">
                  {navigationPrivateRight.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              ) : (
                ""
              )}
              {/*End Nav right*/}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profil drpodown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      {/* Token */}
                      {Cookies.token ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={avatarA}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={avatarA}
                          alt=""
                        />
                      )}
                      {/* End Token */}
                    </Menu.Button>
                  </div>
                  {/* DropDown */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* Token */}
                      {Cookies.token ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/account"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Profil
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => logOut()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Se déconnecter
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/account"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Se connecter
                            </a>
                          )}
                        </Menu.Item>
                      )}
                      {/* End Token */}
                    </Menu.Items>
                  </Transition>
                  {/* End DropDown */}
                </Menu>
              </div>
            </div>
          </div>

          {/* NavBar md-screen */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Token */}
              {Cookies.token
                ? navigationPrivate.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))
                : navigationPublic.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
              {/* End Token */}
            </div>
          </Disclosure.Panel>
          {/* NavBar md-screen */}
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
