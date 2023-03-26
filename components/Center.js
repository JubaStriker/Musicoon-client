import useSpotify from '@/Hooks/useSpotify';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import Songs from '../components/Songs';

const Center = () => {

    const { data: session } = useSession()
    const spotifyApi = useSpotify()
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    const colors = [
        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-red-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
        "from-amber-500",
        "from-white-500",
        "from-gray-500",


    ]



    let x = Math.floor((Math.random() * 10) + 1)

    const [color, setColor] = useState(colors[x]);

    useEffect(() => {
        setColor(colors[x]);
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((error) => { console.log("Something went wrong", error) });

    }, [spotifyApi, playlistId]);

    console.log("playlist", playlist)
    return (
        <div className='flex-grow h-full'>
            <header className='absolute top-16 right-8'>
                <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    {session?.user?.image ? <img className='w-10 h-10 rounded-full' src={session?.user?.image} alt="" /> :
                        <img className='w-10 h-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9sr2zMrJ4GnLvSX0CpKHJ2lqs1ggkcK5_A&usqp=CAU" alt="" />}
                    <h2 className='text-white'>{session?.user?.name}</h2>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-full text-white p-8 w-full`}>

                <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
                </div>
            </section>

            <div className='bg-black'>
                <Songs />
            </div>
        </div>

    );
};

export default Center;