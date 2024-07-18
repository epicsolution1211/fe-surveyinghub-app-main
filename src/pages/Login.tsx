import React, {useState} from "react";
import {useFirebaseApp} from "../firebase";
import {Alert, AlertType, Button} from "@surveying-hub-bv/fe-component-library";
import {signInWithEmailAndPassword} from "firebase/auth";


const Login = (props: { accountLink: string }) => {
    const auth = useFirebaseApp()

    const [infoMessage, setInfoMessage] = useState<{ text: string, type: AlertType } | undefined>()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signInWithEmail = async (email: string, password: string) => {
        if (!auth) {
            throw new Error("Authentication object is not initialized.");
        }
        return signInWithEmailAndPassword(auth, email, password)
    }

/*    const authenticateWithGoogle = async () => {
        if (!auth) {
            throw new Error("Authentication object is not initialized.");
        }
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }*/

    const loginUser: () => void = async () => {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === "" || !emailRegex.test(email)) {
            setInfoMessage({
                type: "error",
                text: "Invalid email provided.",
            });
            return;
        }

        if (password.length < 8) {
            setInfoMessage({
                type: "error",
                text: "Invalid password provided",
            });
            return;
        }

        setInfoMessage({
            type: "info",
            text: "Logging you in...",
        });

        try {
            await signInWithEmail(email, password);
        } catch (error: any) {
            setInfoMessage({
                type: "error",
                text: error.message,
            });
        }
    };

    return <>
        {/*    <div className="flex flex-row justify-center items-center gap-x-4 md:gap-x-6 mb-8 md:mb-14">
                        <a href="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]"/>
                    </a>
                    <p className="uppercase text-[27px] lg:text-[40px] text-white font-normal">
                        RTK{" "}
                        <span className="text-light-green gradient-text font-medium">
                Direct
                </span>
                    </p>
    </div>*/}
        <p className="capitalize md:uppercase text-left mb-4 md:mb-5 ml-6 text-[16px] text-white font-medium">
            Sign in to your account.
        </p>
        <div className="mb-3">
            {infoMessage && <Alert type={infoMessage.type}>{infoMessage.text}</Alert>}
        </div>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                loginUser();
            }}>
            <div className="w-full">
                <div className="mb-3 md:mb-4">
                    <input
                        placeholder="Enter your email"
                        className="inline-block font-normal bg-[#222222] bg-opacity-35 border-2 border-[#222222] hover:border-white focus:border-[#1ea707] focus-visible:border-[#1ea707] outline-none border-opacity-35 rounded-[20px] text-white text-16 m-0 p-[20px]  w-full transition-all duration-300 placeholder:text-[#494949]"
                        autoComplete="off"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input
                        placeholder="Type your password"
                        className="inline-block font-normal bg-[#222222] bg-opacity-35 border-2 border-[#222222] hover:border-white focus:border-[#1ea707] focus-visible:border-[#1ea707] outline-none border-opacity-35 rounded-[20px] text-white text-16 m-0 p-[20px]  w-full transition-all duration-300 placeholder:text-[#494949]"
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="text-[14px] md:text-[14px] uppercase text-right my-3.5 md:my-4">
                    <a href="/changePW"
                       className="text-[#009CDF] font-normal">
                        Forgot Your password?
                    </a>
                </div>
                <div>
                    <Button
                        padding="width"
                        label="SIGN IN"
                        onClick="submit"/>
                </div>
            </div>
        </form>
        {/*        <div className="mt-3.5 md:mt-4">
            <Button
                label="Sign in with Google" type="black" padding="width"
                icon={{
                    src: "data:image/png;base64,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",
                    width: "38px"
                }}
                onClick={() => authenticateWithGoogle()}/>
        </div>
        <div className="mt-3">
            <Button
                label="Sign in with Facebook" type="black" padding="width"
                icon={{
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAlCAYAAACgc9J8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFYSURBVHgB7Za/S8NQEMe/95IUs4koxc1RZxHEH+BWdHIQ0YLgZHByc3Z3cSutQ1xUHFx1cVXEv0Co6CDFUVGHapqcV0f7Xn5AhoL5woXHXe7z7iWXI4QUWlj2B7/dYEMRLxIwwaAyGA4IbQm/iX2JvVASaH61UWEbvixHk+5VccHZ9bonoMs0oK6MlU2v1cYcsu+YeAQpZazMIrWXBWSsbHKr7rif9CzLMjLI1jlL7zQlNRtBUvF+h9uHFJWCRJicfdgIAo6uj71dQ54mQYVDMCq8MkViW0O7Ef82aj6wOPUvjOaqjQONf1ysokuQt3khzdns8RPuu62xgyy7A0s6v2I+y+2YMpaa+T0zjh5zhPFTbrBAUcsW4mtPhMiV64A2i/CBiDt/3bcn3oN2BM1Ua5sKlq+LRRyu3Jxun+ti/+RzKmAFrID1J0z742LJCGawdp5RaLdg0A8xjFxdOQBTcwAAAABJRU5ErkJggg==",
                    width: "19px"
                }}
                onClick={() => authenticateWithGoogle()}/>
        </div>*/}
        <p className="my-7 md:my-7 text-[16px] font-medium">
            OR
        </p>
        <div className="w-full card-width px-0 pb-6 md:pb-16 mx-auto">
            <Button
                label="Create an account" type="secondary" padding="width"
                onClick={props.accountLink}/>
        </div>
    </>
}

export default Login
