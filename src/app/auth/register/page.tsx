"use client";

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useRegister } from '@/hooks/useRegister';
import { initialValuesRegister } from '@/initialValuesFormik/initialValues.register';
import { validationSchemaRegister } from '@/validation/register';

import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Register() {
    const {
        error,
        isFormSubmitting,
        handleSubmit
    } = useRegister();

    const router = useRouter();

    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status !== "unauthenticated") {
        return null;
    }

    return (
        <main className='min-h-screen flex items-center justify-center'>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValuesRegister}
                validationSchema={validationSchemaRegister}
            >
                {({ values }) => (
                    <Form noValidate className='flex flex-col gap-2 p-4 border border-zinc-300 min-w-[400px] rounded'>
                        <Input name='name' type='text' required />
                        <Input name='email' type='email' required />
                        <Input name='password' type='password' required />

                        <Button
                            type='submit'
                            text={isFormSubmitting ? "Carregando..." : "Inscreva-se"}
                            className='bg-gradient-to-r from-green-400 to-blue-500 tex-white rounded p-2 cursor-pointer'
                            disabled={isFormSubmitting}
                        />
                        {error && (
                            <span className="text-red-500 text-sm text-center">{error}</span>
                        )}
                        <span className=' text-center text-zinc-200'>
                            Não possui uma conta?
                            <strong className='text-zinc-400 ml-1'>
                                <Link href={'/auth/login'}> Entre</Link>
                            </strong>
                        </span>
                    </Form>
                )}
            </Formik>
        </main>
    );
}