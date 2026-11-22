"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type PillOption<T extends string> = {
  value: T
  label: string
  /** Optional icon rendered above the label. */
  icon?: React.ComponentType<{ className?: string }>
}

type PillGroupProps<T extends string> = {
  /** Shared `name` for every radio input in the group. */
  name: string
  value: T
  onChange: (value: T) => void
  options: readonly PillOption<T>[]
  className?: string
  /** Applied to each pill, on top of the base styles. */
  pillClassName?: string
}

/**
 * Accessible single-select pill group. Renders real radio inputs (visually
 * hidden) so keyboard navigation and form semantics keep working; the label
 * carries the visual state via `has-[:checked]`.
 */
export function PillGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  className,
  pillClassName,
}: PillGroupProps<T>) {
  return (
    <div role="radiogroup" className={className}>
      {options.map((option) => {
        const Icon = option.icon
        const selected = option.value === value
        return (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#1A1A1F] px-3 py-2.5 text-sm text-[#EDEDEF]/70 transition-colors",
              "has-[:checked]:border-[#5C53FE] has-[:checked]:bg-[#5C53FE]/15 has-[:checked]:text-white",
              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#5C53FE]/60",
              pillClassName,
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {Icon ? <Icon aria-hidden className="size-4" /> : null}
            <span>{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}
