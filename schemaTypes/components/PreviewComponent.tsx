
type TPreviewComponentProps = {
    document: {
        published?: any
    }
}

export const PreviewComponent = (props: TPreviewComponentProps) => {

    return (
        <div>
            {props.document.published?.name}
        </div>
    )
}
