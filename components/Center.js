import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';


const Center = () => {

    const { data: session } = useSession()
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

    // const color = shuffle((colors).pop)
    // console.log(color)

    let x = Math.floor((Math.random() * 10) + 1)

    const [color, setColor] = useState(colors[x]);

    useEffect(() => {
        setColor(colors[x]);
    }, [])

    console.log(x)

    return (
        <div className='flex-grow'>
            <header className='absolute top-16 right-8'>
                <div className='flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img className='w-10 h-10 rounded-full' src={session?.user?.image} alt="" />
                    <h2>{session?.user?.name}</h2>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8 w-full`}>

            </section>
        </div>

    );
};

export default Center;