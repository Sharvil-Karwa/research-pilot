import LoginIll from "@/../public/Assets/loginIll.svg";
// import Login from "../../components/Login";
import Image from "next/image";
import GoogleButton from "react-google-button";
import { auth, provider } from "@/../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        localStorage.setItem("user", JSON.stringify(user));

        router.push("/prompt");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#412376] to-[#6029C0]">
      <div className="grid grid-cols-2 min-h-screen">
        <div className="flex h-full w-full justify-center items-center">
          {/* <Login /> */}
          <div className="flex flex-col gap-y-4 py-10 w-full bg-white items-center justify-center m-14 rounded-md">
            <h1 className="font-semibold text-2xl">Login</h1>
            <GoogleButton
              style={{ width: "75%" }}
              type="light" // can be light or dark
              onClick={signIn}
            />
          </div>
        </div>
        <div className="flex  h-full w-full justify-center items-center">
          <Image src={LoginIll} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Index;
