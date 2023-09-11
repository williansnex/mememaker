'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isLightMode = theme === 'light'

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isLightMode ? 'dark' : 'light')}
      >
        {isLightMode ? (
          <>
            <Sun size={35} className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Switch to dark mode</span>
          </>
        ) : (
          <>
            <Moon size={35} className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Switch to light mode</span>
          </>
        )}
      </Button>
    </div>
  )
}
