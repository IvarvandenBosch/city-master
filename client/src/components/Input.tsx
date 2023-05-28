import { Box, TextField } from "@suid/material";
import { FaSolidEye } from "solid-icons/fa";

export default function Input(props: {type: string, label: string, placeholder: string}) {
  return (
    <div class={props.type === 'password' ? "password-input w-full" : "w-full"} >
      <TextField id="standard-basic" type={props.type} label={props.label} placeholder={props.placeholder} variant="standard" />
      {
        props.type === 'password' && <div class="eye"><FaSolidEye/></div>
      }
    </div>
  );
}
