import CtaButton from "@/src/components/CtaButton"
import Loader from "@/src/components/Loader"
import { Suspense } from "react"
import art from "@/public/art.svg"
import Image from "next/image"
export default function Landing() {
  return (
    <div>
      <Image src={art} alt="chest art" loading="eager" width="500" height="500" className="mx-auto my-10 w-1/2 min-w-50 max-w-80 animate-bounce" />
      <h2 className="text-center font-sans font-bold text-2xl my-5 text-foreground">A place to store your thoughts</h2>
      <div className="flex justify-center my-5">
        <Suspense fallback={<Loader />}>
          <CtaButton />
        </Suspense>
      </div>
    </div>
  )
    
}
