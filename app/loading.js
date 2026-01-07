import art from '@/public/art.svg'
import Image from 'next/image'
export default function MainLoading(){
    return(
        <div className='w-screen min-h-screen flex justify-center items-center'>
            <Image className='animate-bounce w-50' src={art} alt="chest art" loading="eager" width="500" height="500" />
        </div>
    )
}