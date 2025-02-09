import { ToastProps } from '@repo/ui/toast';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

type Toast = {
    id: string;
    props: ToastProps;
}

const useToasts = () => {
    const [queue, setQueue] = useState<Toast[]>([]);

    useEffect(() => {
        console.log('QUEUE: ', queue);
    }, [queue]);

    const toast = (props: ToastProps) =>
        setQueue((q: Toast[]) => [{ id: v4(), props }, ...q]);

    return {
        queue,
        toast,
    }
};

export default useToasts;
