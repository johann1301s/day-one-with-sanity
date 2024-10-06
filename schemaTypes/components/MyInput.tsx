import { InputProps } from "sanity"

export const MyInput = (props: InputProps) => {
    return (
      <div style={{border: '1px solid red'}}>
        {props.renderDefault(props)}
      </div>
    )
}
