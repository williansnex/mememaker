'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import logomeme from '@/image/logo.svg'
import { ModeToggle } from '@/components/ModeToggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import qs from 'qs'

interface Template {
  id: string
  name: string
  url: string
  box_count: number
}

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  )
  const [boxes, setBoxes] = useState<string[]>([])
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const resp = await fetch('https://api.imgflip.com/get_memes')
      const {
        data: { memes },
      } = await resp.json()
      setTemplates(memes)
    })()
  }, [])

  const handleInputChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValues = [...boxes]
      newValues[index] = e.target.value
      setBoxes(newValues)
    }

  function handleSelectTemplate(template: Template) {
    setSelectedTemplate(template)
    setBoxes([])
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!selectedTemplate) return

    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: 'willcsgo',
      password: 'wr12wr34wr56',
      boxes: boxes.map((text) => ({ text })),
    })

    const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`)
    const {
      data: { url },
    } = await resp.json()

    setGeneratedMeme(url)
  }

  function handleReset() {
    setSelectedTemplate(null)
    setBoxes([])
    setGeneratedMeme(null)
  }

  return (
    <div className="w-full h-full flex items-center justify-center flex-col mt-5">
      <div className="flex">
        <Image
          width={85}
          height={85}
          src={logomeme}
          alt="mememaker"
          className="h-full w-full"
        />
        <ModeToggle />
      </div>
      <Card className="w-[555px] p-5 mt-5">
        {generatedMeme && (
          <>
            <Image
              width={600}
              height={500}
              src={generatedMeme}
              alt="Generated meme"
            />
            <Button
              type="button"
              onClick={handleReset}
              className="mt-4 w-full bg-[#4395D8] hover:bg-[#3672a3] text-white bold"
            >
              Criar outro Meme!
            </Button>
          </>
        )}
        {!generatedMeme && (
          <>
            <h2 className="mb-2">1º Selecione um template</h2>
            <Card className="dark:bg-slate-500 w-full h-[130px] flex items-center mb-10">
              <ScrollArea className="w-[1000px] h-[100px] pl-3 pr-1">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    type="button"
                    className={`w-[85px] h-[85px] mr-3 mt-2 p-0 ${
                      template.id === selectedTemplate?.id
                        ? 'border-4 border-blue-500'
                        : ''
                    }`}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <Image
                      src={template.url}
                      alt={template.name}
                      width={130}
                      height={130}
                      className="h-full w-full"
                    />
                  </Button>
                ))}
              </ScrollArea>
            </Card>

            {selectedTemplate && (
              <>
                <h2 className="mb-3">2º Selecione os textos</h2>
                <form onSubmit={handleSubmit}>
                  {Array.from(
                    { length: selectedTemplate.box_count },
                    (_, index) => (
                      <Input
                        className="mb-3"
                        key={index}
                        placeholder={`Texto # ${index + 1}`}
                        onChange={handleInputChange(index)}
                      />
                    ),
                  )}

                  <Button
                    type="submit"
                    className="mt-4 w-full bg-[#4395D8] hover.bg-[#3672a3] text-white bold"
                  >
                    MakeMyMeme!
                  </Button>
                </form>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
