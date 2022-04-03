import { Transition } from '@headlessui/react'

export default function ActionMessage({on, children, ...props}) {
    return <>
    <Transition 
        show={on}
        leave="transition ease-in duration-1000" 
        leaveFrom="opacity-100" 
        leaveTo="opacity-0">
        <div className={`text-sm text-gray-600 ${props.className}`}>
            {children}
        </div>
    </Transition>
    </>
}