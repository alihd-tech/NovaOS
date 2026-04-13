"use client"

import { useState } from "react"

export function CalculatorApp() {
  const [display, setDisplay] = useState("0")
  const [prev, setPrev] = useState<number | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [resetNext, setResetNext] = useState(false)

  const handleNumber = (num: string) => {
    if (resetNext) {
      setDisplay(num)
      setResetNext(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperator = (operator: string) => {
    const current = Number.parseFloat(display)
    if (prev !== null && op) {
      const result = calculate(prev, current, op)
      setDisplay(String(result))
      setPrev(result)
    } else {
      setPrev(current)
    }
    setOp(operator)
    setResetNext(true)
  }

  const calculate = (a: number, b: number, operator: string): number => {
    switch (operator) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "*":
        return a * b
      case "/":
        return b !== 0 ? a / b : 0
      default:
        return b
    }
  }

  const handleEquals = () => {
    if (prev !== null && op) {
      const current = Number.parseFloat(display)
      const result = calculate(prev, current, op)
      setDisplay(String(result))
      setPrev(null)
      setOp(null)
      setResetNext(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPrev(null)
    setOp(null)
    setResetNext(false)
  }

  const handlePercent = () => {
    setDisplay(String(Number.parseFloat(display) / 100))
  }

  const handleToggleSign = () => {
    setDisplay(String(-Number.parseFloat(display)))
  }

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const Button = ({
    label,
    onClick,
    variant = "default",
    wide = false,
  }: {
    label: string
    onClick: () => void
    variant?: "default" | "operator" | "function"
    wide?: boolean
  }) => (
    <button
      type="button"
      className={`flex items-center justify-center rounded-full text-lg font-medium transition-all active:brightness-75 ${
        wide ? "col-span-2 px-6 text-left" : ""
      } ${
        variant === "operator"
          ? "bg-[#ff9f0a] text-[#1c1c1e]"
          : variant === "function"
            ? "bg-[#a5a5a5] text-[#1c1c1e]"
            : "bg-[#333336] text-foreground"
      }`}
      style={{ height: 56 }}
      onClick={onClick}
    >
      {label}
    </button>
  )

  return (
    <div className="flex h-full flex-col bg-[#1c1c1e]" role="application" aria-label="Calculator">
      {/* Display */}
      <div className="flex flex-1 items-end justify-end px-5 pb-2">
        <span
          className="text-right font-light text-foreground"
          style={{
            fontSize: display.length > 9 ? "2rem" : display.length > 6 ? "2.5rem" : "3rem",
          }}
          aria-live="polite"
        >
          {display}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 p-3">
        <Button label="AC" onClick={handleClear} variant="function" />
        <Button label="+/-" onClick={handleToggleSign} variant="function" />
        <Button label="%" onClick={handlePercent} variant="function" />
        <Button label="/" onClick={() => handleOperator("/")} variant="operator" />

        <Button label="7" onClick={() => handleNumber("7")} />
        <Button label="8" onClick={() => handleNumber("8")} />
        <Button label="9" onClick={() => handleNumber("9")} />
        <Button label="*" onClick={() => handleOperator("*")} variant="operator" />

        <Button label="4" onClick={() => handleNumber("4")} />
        <Button label="5" onClick={() => handleNumber("5")} />
        <Button label="6" onClick={() => handleNumber("6")} />
        <Button label="-" onClick={() => handleOperator("-")} variant="operator" />

        <Button label="1" onClick={() => handleNumber("1")} />
        <Button label="2" onClick={() => handleNumber("2")} />
        <Button label="3" onClick={() => handleNumber("3")} />
        <Button label="+" onClick={() => handleOperator("+")} variant="operator" />

        <Button label="0" onClick={() => handleNumber("0")} wide />
        <Button label="." onClick={handleDecimal} />
        <Button label="=" onClick={handleEquals} variant="operator" />
      </div>
    </div>
  )
}
