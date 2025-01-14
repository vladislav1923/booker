'use client';

import { Button } from '@repo/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { trpc } from '../trpc';

export const Form = () => {
    const [name, setName] = useState<string>('');
    const [response, setResponse] = useState<{ message: string } | null>(null);
    const [error, setError] = useState<string | undefined>();

    const getMessage = trpc.getMessage.useMutation();

    useEffect(() => {
        setResponse(null);
        setError(undefined);
    }, [name]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await getMessage.mutateAsync({ name });

            setResponse(response);
        } catch (err) {
            console.error(err);
            setError('Unable to fetch response');
        }
    };

    const onReset = () => {
        setName('');
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={onChange}
                ></input>
                <Button type="submit">Submit</Button>
            </form>
            {error && (
                <div>
                    <h3>Error</h3>
                    <p>{error}</p>
                </div>
            )}
            {response && (
                <div>
                    <h3>Greeting</h3>
                    <p>{response.message}</p>
                    <Button onClick={onReset}>Reset</Button>
                </div>
            )}
        </>
    );
};
