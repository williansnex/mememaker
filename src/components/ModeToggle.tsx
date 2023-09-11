'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isLightMode = theme === 'light'

  return (
    <div className="mt-14">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isLightMode ? 'dark' : 'light')}
      >
        {isLightMode ? (
          <>
            <Sun size={48} className="h-[5rem] w-[5rem]" />
            <span className="sr-only">Switch to dark mode</span>
          </>
        ) : (
          <>
            <Moon size={48} className="h-[5rem] w-[5rem] dark:text-[#64748B]" />
            <span className="sr-only">Switch to light mode</span>
          </>
        )}
      </Button>
    </div>
  )
}
