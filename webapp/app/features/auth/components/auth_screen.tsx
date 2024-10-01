"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign_in";
import { SignUpCard} from "./sign_up";

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");
    return(
        <div className="h-full flex items-center justify-center bg-slate-600">
            <div className="md:h-auto md:w-[400px]">
                {state === "signIn" ? <SignInCard setState={setState}/> : <SignUpCard setState={setState}/>}
            </div>
        </div>
    );
}