import { InputProps } from "sanity"

export const MyInputLocal = (props: InputProps) => {
    return (
      <div style={{border: '1px solid blue'}}>
        {props.renderDefault(props)}
      </div>
    )
}
