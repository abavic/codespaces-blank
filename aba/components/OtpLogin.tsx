"use client";
import { auth } from "@/firebase";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, } from "firebase/auth";
import React, { FormEvent, useEffect, useState, useTransition} from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,  } from "@/components/ui/input-otp"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


export default function OtpLogin() {
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<String | null>(null);
    const [success, setSuccess] = useState("");
    const [resendCountDown, setResendCountDown] = useState(0);

    const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
    const [confirmationResult, setConfirmationResult] =useState<ConfirmationResult | null>(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendCountDown > 0) {
            timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCountDown]);

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
            }
        );

        setRecaptchaVerifier(recaptchaVerifier);

        return () => {
            recaptchaVerifier.clear();
        };
    }, [auth]);

    const requestOtp = async (e?: FormEvent<HTMLFormElement>) =>{
        e?.preventDefault();
    }


    return (
        <div>
            {!confirmationResult && (
                <form onSubmit={requestOtp}>
                    <input
                        className="text-black"
                        type="tel"
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="text-xs text-gray-400 mt-2" >
                        Please enter your number with the country code(i.e. +234 for Nigeria)
                    </p>
                </form>
            )}

            <Button
                disabled={!phoneNumber || isPending || resendCountDown > 0}
                onClick={() => requestOtp}
                className="mt-5"
                >
                    {resendCountDown > 0
                    ? `Resend OTP in ${resendCountDown}`
                : isPending
                ? "sending OTP"
                : "send OTP"}
                </Button>

                <div className="p-10 text-center">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </div>

                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                             <span
                       className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
               >Loading...</span>
</div>
             <div id="recaptcha-container" />
             
        </div>
       
    );
}