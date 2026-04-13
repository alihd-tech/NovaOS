"use client"

import React from "react"

/** Encapsulated section for settings panels. Add sections with consistent hierarchy. */
export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-[13px] text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

export function SettingRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/50">
      <span className="text-[13px] font-medium">{label}</span>
      {children}
    </div>
  )
}

export function SettingToggle({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/50">
      <span className="text-[13px] font-medium">{label}</span>
      <button
        className={`w-[42px] h-[25px] rounded-full relative transition-colors ${checked ? "bg-[hsl(130,60%,45%)]" : "bg-muted-foreground/20"
          }`}
        onClick={() => onCheckedChange(!checked)}
        role="switch"
        aria-checked={checked}
      >
        <div
          className="w-[21px] h-[21px] rounded-full bg-primary-foreground absolute top-[2px] transition-transform shadow-sm"
          style={{ left: checked ? "19px" : "2px" }}
        />
      </button>
    </div>
  )
}

export function SettingSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onValueChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onValueChange: (value: number) => void
}) {
  return (
    <div className="py-3 px-4 rounded-xl bg-muted/50 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium">{label}</span>
        <span className="text-[13px] text-muted-foreground">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-muted-foreground/20 accent-primary"
      />
    </div>
  )
}

export function SettingSelect<T extends string>({
  label,
  value,
  options,
  onValueChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onValueChange: (value: T) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/50">
      <span className="text-[13px] font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value as T)}
        className="text-[13px] bg-background border border-border rounded-lg px-3 py-1.5 min-w-[120px]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
