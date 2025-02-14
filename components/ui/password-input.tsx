import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { Input } from "./input";

const PasswordInput = forwardRef<
  React.ComponentRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={isPasswordVisible ? "text" : "password"}
        ref={ref}
        {...props}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="sr-only">
              {isPasswordVisible ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {isPasswordVisible ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
});
PasswordInput.displayName = "Input";

export { PasswordInput };
