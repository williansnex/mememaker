import Image from 'next/image'
import logomeme from '@/image/logo.svg'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <Image src={logomeme} alt="mememaker" className="mx-auto" />
      <Card>
        <h1>Hello World</h1>
      </Card>
    </div>
  )
}
