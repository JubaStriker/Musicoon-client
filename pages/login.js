import { getProviders, signIn, useSession, signOut } from "next-auth/react"

const login = ({ providers }) => {

    console.log(providers)

    async function handleGoogleSignIn() {
        signIn('google', { callbackUrl: "http://localhost:3000" })
    }
    async function handleSpotifySignIn() {
        signIn('spotify', { callbackUrl: "http://localhost:3000" })
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen w-full bg-black">
            <img className="w-52 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" alt="logo" />

            {/* {Object.values(providers).map((provider) =>
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, { callbackUrl: "http://localhost:3000" })} className="p-5 rounded-full bg-green-400 mt-2">Login with {provider.name}</button>
                </div>
            )} */}

            <div>
                <button onClick={handleGoogleSignIn} className="p-5 rounded-full bg-green-600 mt-2"> Sign in with google</button>
            </div>
            <div>
                <button onClick={handleSpotifySignIn} className="p-5 rounded-full bg-green-600 mt-2"> Sign in with spotify</button>
            </div>
        </div>
    );
};

export default login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}