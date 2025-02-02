'use client';
import { Button } from '@repo/ui/button';
import { Checkbox } from '@repo/ui/checkbox';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { FormikHandlers } from 'formik/dist/types';

import { trpc } from '../../trpc';

type Values = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    // marketingAccept: number;
}

const SignUpForm = () => {
    const signUp = trpc.signUp.useMutation();

    const submitHandler = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ) => {
        console.log('Values: ', values);
    };

    const renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    }: FormikProps<Values>) => (
        <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
            <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    placeholder="Ivan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    placeholder="Ivanov"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className="col-span-6">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    placeholder="ivanov@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="confirmPassword">
                    Confirm Password
                </Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            {/*<div className="col-span-6 flex gap-1">*/}
            {/*    <Checkbox*/}
            {/*        id="marketingAccept"*/}
            {/*        value={values.marketingAccept}*/}
            {/*        onChange={handleChange}*/}
            {/*        onBlur={handleBlur}*/}
            {/*    />*/}
            {/*    <Label htmlFor="marketingAccept">*/}
            {/*        <span className="font-normal leading-5 text-gray-500">*/}
            {/*            I want to receive emails about events,*/}
            {/*            product updates and service*/}
            {/*            announcements.*/}
            {/*        </span>*/}
            {/*    </Label>*/}
            {/*</div>*/}

            <div className="col-span-6">
                <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a
                        href="#"
                        className="text-gray-700 underline px-1"
                    >
                        terms and conditions
                    </a>
                    and
                    <a
                        href="#"
                        className="text-gray-700 underline px-1"
                    >
                        privacy policy
                    </a>
                    .
                </p>
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button size="lg" disabled={isSubmitting} type="submit">Create an account</Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a
                        href="#"
                        className="text-gray-700 underline px-1"
                    >
                        Log in
                    </a>
                    .
                </p>
            </div>
        </form>
    );

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                // marketingAccept: true,
            }}
            onSubmit={submitHandler}
        >
            {renderForm}
        </Formik>
    );
};

export default SignUpForm;
