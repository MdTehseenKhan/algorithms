'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const ToggleTheme = () => {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={toggleTheme}
        className={buttonVariants({ size: 'icon', variant: 'ghost' })}
      >
        <SunIcon className="h-4 hidden dark:block" />
        <MoonIcon className="h-4 dark:hidden" />
        <span className="sr-only">Toggle mode</span>
      </TooltipTrigger>
      <TooltipContent>Toggle mode</TooltipContent>
    </Tooltip>
  )
}
