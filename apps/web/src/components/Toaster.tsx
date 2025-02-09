'use client';

import {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@repo/ui/toast';

import useToasts from '../hooks/useToasts';

const Toaster = () => {
    const { queue } = useToasts();

    return (
        <ToastProvider>
            <ToastViewport>
                {queue.map(({ id, props }) => (
                    <Toast key={id}>
                        {props.title && <ToastTitle>{props.title}</ToastTitle>}
                        {/*{props.description && (*/}
                        {/*    <ToastDescription>{props.description}</ToastDescription>*/}
                        {/*)}*/}
                        {/*{props.action && <ToastAction>{props.action}</ToastAction>}*/}
                        {/*{props.close && <ToastClose>{props.close}</ToastClose>}*/}
                    </Toast>
                ))}
            </ToastViewport>
        </ToastProvider>
    )
};

export default Toaster;
