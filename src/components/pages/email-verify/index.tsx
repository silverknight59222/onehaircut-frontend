import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Auth } from "@/api/auth";
import userLoader from '@/hooks/useLoader';
import useSnackbar from '@/hooks/useSnackbar';
import { LogoCircleFixLeft, LogoIcon } from "@/components/utilis/Icons";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import Link from "next/link";
import { Theme_A } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";

const Forgot = ({ props }: any) => {
    const { loadingView } = userLoader();

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const verifyEmail = async () => {
        setIsLoading(true);
        await Auth.emailVerify({
            id: props.params.id,
            hash: props.params.hash,
            searchParams: props.searchParams
        })
            .then((resp) => {
                router.push('/login');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        verifyEmail()
    }, [])

    return (
        <>
            {isLoading && loadingView()}
            <div className="w-full flex flex-col items-center min-h-screen bg-white md:bg-transparent">
                <div className="hidden md:block fixed -left-32 md:-left-28 -bottom-32 md:-bottom-28">
                    <LogoCircleFixLeft />
                </div>
                <div className="mt-8">
                    <LogoIcon className={''} />
                </div>
                <div className="z-10 mt-8 md:mt-12 w-full md:w-[767px] md:rounded-3xl md:bg-white md:shadow-2xl px-4 sm:px-16 md:px-24">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-black font-medium text-3xl my-8 md:my-12">
                            vérification de l'E-mail
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Forgot;
