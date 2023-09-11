'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logomeme from '@/image/logo.svg'
import { ModeToggle } from '@/components/ModeToggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    ;(async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes')
      const {
        data: { memes },
      } = await resp.json()
      setTemplates(memes)
    })()
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="flex">
        <Image src={logomeme} alt="mememaker" className="mx-auto" />
        <ModeToggle />
      </div>
      <Card className="w-[555px] p-5 mt-8 ">
        <h2 className="mb-2">1º Selecione um template</h2>
        <Card className="bg-slate-500 w-full h-[100px] flex items-center mb-10">
          <ScrollArea className="w-[1000px] h-[100px] pl-3 pr-1">
            {templates.map((template) => (
              <Button
                key={template.id}
                type="button"
                className=" w-[70px] h-[70px] mr-3 mt-5 p-0"
              >
                <Image
                  src={template.url}
                  alt={template.name}
                  width={100}
                  height={100}
                  className="h-full w-full"
                />
              </Button>
            ))}
          </ScrollArea>
        </Card>
        <h2 className="mb-2">2º Textos</h2>
        <form>
          <div className="space-y-3">
            <Input placeholder="text #1" />
            <Input placeholder="text #1" />
            <Input placeholder="text #1" />
          </div>
          <Button
            type="submit"
            className="mt-4 w-full bg-[#4395D8] hover:bg-[#3672a3] text-white bold"
          >
            MakeMyMeme!
          </Button>
        </form>
      </Card>
    </div>
  )
}
