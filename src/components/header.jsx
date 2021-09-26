/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";

export default function Header(props) {
  const cartItems = props.cartItems;
  return (
    <header className="relative bg-white">
      <nav aria-label="Top" className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="relative border-b border-gray-200 px-4 pb-2 sm:static sm:px-0 sm:pb-0">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-1 flex">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-6 w-auto"
                  src="https://images.ctfassets.net/e5382hct74si/5L4IjrqHTSzEQDQcJ9qDUz/f298added4049edf305eb484273a8edb/bejamas-logo.svg"
                  alt=""
                />
              </a>
            </div>

            <div className="flex-1 flex items-center justify-end">
              {/* Cart */}
              <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                <Popover.Button className="group -m-2 p-2 flex items-center">
                  <ShoppingBagIcon
                    className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartItems.length}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">Shopping Cart</h2>

                    <form className="max-w-2xl mx-auto px-4">
                      <ul role="list" className="divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li
                            key={product.id}
                            className="py-6 flex items-center"
                          >
                            <img
                              src={product.image.src}
                              alt={product.image.alt}
                              className="flex-none w-16 h-16 rounded-md border border-gray-200"
                            />
                            <div className="ml-4 flex-auto">
                              <h3 className="font-medium text-gray-900">
                                {product.name}
                              </h3>
                              <p className="text-gray-500">
                                {product.category}{" "}
                                <span className="text-xs font-semibold pl-2">
                                  ${product.price}
                                </span>
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="submit"
                        className="w-full bg-gray-900 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                      >
                        Checkout
                      </button>

                      <p className="mt-6 text-center">
                        <a
                          href="#"
                          onClick={() => props.clearCart()}
                          className="text-sm font-medium text-gray-600 hover:text-gray-500"
                        >
                          Clear
                        </a>
                      </p>
                    </form>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
