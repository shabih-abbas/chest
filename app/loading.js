import art from '@/public/art.svg'
import Image from 'next/image'
export default function MainLoading(){
    return(
        <div className='w-full min-h-screen flex justify-center items-center'>
            <Image className='animate-bounce' src={art} alt="chest art" loading="eager" width="500" height="500" />
        </div>
    )
}