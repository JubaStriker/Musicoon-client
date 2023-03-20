import { getProviders, signIn, useSession, signOut } from "next-auth/react"

const login = ({ providers }) => {

    async function handleGoogleSignIn() {
        signIn('google', { callbackUrl: "http://localhost:3000" })
    }
    return (
        <div>
            <img className="w-52 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" alt="logo" />

            {Object.values(providers).map((provider) =>
                <div key={provider.name}>
                    <button>Login with {provider.name}</button>
                </div>
            )}

            <div>
                <button onClick={handleGoogleSignIn} className="btn"> Sign in with google</button>
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