import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp"

interface InputOTPGeneratorProps {
  onChange: (arg: unknown) => void;
  length?: number,
  error?: boolean,
}

export function InputOTPGenerator({ onChange, error = false, length = 6 }: InputOTPGeneratorProps) {
  return (
    <InputOTP maxLength={length} onChange={onChange}>
      <InputOTPGroup className="space-x-4">
        {[...Array(length)].map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            error={error}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}
