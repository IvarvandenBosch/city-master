import { Box, TextField } from "@suid/material";
import { FaSolidEye, FaSolidEyeSlash } from "solid-icons/fa";
import { createSignal } from "solid-js";

export default function PassInput(props: {
  label: string;
  placeholder: string;
  name: string;
}) {
  const [passType, setPassType] = createSignal(true);
  return (
    <div class="password-input w-full">
      <TextField
        id="standard-basic"
        type={passType() ? "password" : "text"}
        label={props.label}
        placeholder={props.placeholder}
        variant="standard"
        name={props.name}
      />
      <div
        class="eye"
        onClick={() => setPassType((oldPassType) => !oldPassType)}
      >
        {passType() ? <FaSolidEyeSlash /> : <FaSolidEye />}
      </div>
    </div>
  );
}
