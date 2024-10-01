import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TriangleAlert} from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { 
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle 
    } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignInFlow } from "../types";

interface SignUpCardProps{
    setState: (state: SignInFlow) => void;
};

export const SignUpCard = ({setState}: SignUpCardProps) => {
    const { signIn } = useAuthActions();

    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError]  = useState("");
    const [pending, setPending] = useState(false);



    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setPending(true);
        signIn("password", {name, email, password, flow: "signUp"})
            .catch(() => {
                setError("Something went wrong");
            })
            .finally(() => {
                setPending(false);
            })
    };  
    return(
        <Card className="w-full h-full p-8">
            <CardHeader className="px=0 pt-0">
                <CardTitle >
                    Sign Up to continue
                </CardTitle>
                <CardDescription>
                    Bingus
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex  items-center gap-x-2 text-sm text-destructive mb-3">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />

                    <Input
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        type="password"
                        required
                    />

                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Sign Up
                    </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                    Already have an account? <span onClick={() => setState("signIn")} className="text-sky-400 hover:underline cursor-pointer">Sign In</span>
                </p>
            </CardContent>
        </Card>
    );
}