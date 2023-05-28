import { TextField } from "@suid/material";
export default function Input(props: {type: string, label: string, placeholder: string}) {
  return (
    <TextField id="standard-basic" type={props.type} label={props.label} placeholder={props.placeholder} variant="standard" />
  );
}
