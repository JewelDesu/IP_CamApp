import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle 
    } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignInFlow } from "../types";
import { TriangleAlert} from "lucide-react";


interface SignInCardProps{
    setState: (state: SignInFlow) => void;
};

export const SignInCard = ({setState}: SignInCardProps) => {
    const { signIn } = useAuthActions();
    
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]  = useState("");
    const [pending, setPending] = useState(false);

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setPending(true);
        signIn("password", {email, password, flow: "signIn"})

        .catch(() => {
            setError("Invalid Username or Password");
        })
        .finally(() => {
            setPending(false);
        })
    }




    return(
        <Card className="w-full h-full p-8">
            <CardHeader className="px=0 pt-0">
                <CardTitle >
                    Login to continue
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
                <form onSubmit={onPasswordSignIn} className="space-y-2.5">
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

                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Login
                    </Button>

                </form>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <span onClick={() => setState("signUp")} className="text-sky-400 hover:underline cursor-pointer">Sign Up</span>
                </p>
            </CardContent>
        </Card>
    );
}