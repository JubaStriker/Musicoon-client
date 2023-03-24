import { AiOutlineHome, AiOutlineSearch, AiOutlinePlusCircle, AiOutlineHeart } from 'react-icons/ai'
import { MdLibraryMusic } from 'react-icons/md'
import { HiOutlineRss } from 'react-icons/hi'
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import useSpotify from '../Hooks/useSpotify';

const Sidebar = () => {

    const spotifyApi = useSpotify()
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistId] = useState(null)

    const { data: session } = useSession()
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])

    console.log("playlists", playlists)
    const handleSignOut = () => {
        signOut()
    }
    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide'>
            <div className='space-y-4'>
                {session ?
                    <button onClick={handleSignOut} className='flex items-center gap-2  hover:text-white'>
                        <BiLogOutCircle className='h-5 w-5' />
                        <p>Sign out</p>
                    </button> :
                    <div>
                        <Link href={"/login"} className="flex items-center gap-2  hover:text-white"><BiLogInCircle className='h-5 w-5' />
                            <p>Login</p></Link >
                    </div>}

                <button className='flex items-center gap-2  hover:text-white'>
                    <AiOutlineHome className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center gap-2 hover:text-white'>
                    <AiOutlineSearch className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center gap-2 hover:text-white'>
                    <MdLibraryMusic className='h-5 w-5' />
                    <p>Your Library</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900' />

                <button className='flex items-center gap-2  hover:text-white'>
                    <AiOutlinePlusCircle className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center gap-2 hover:text-white'>
                    <AiOutlineHeart className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center gap-2 hover:text-white'>
                    <HiOutlineRss className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900' />

                {/* Playlist */}

                {playlists.map(playlist =>
                    <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white'>{playlist.name}</p>
                )}


            </div>
        </div>
    );
};

export default Sidebar;