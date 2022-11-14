export const defaultCaptionProps = {
  text: '',
}

type CaptionProps = typeof defaultCaptionProps;

export default function Caption({text}: CaptionProps) {
  return (
    <h3 style={{ margin: '8px 16px 0' }}>{text}</h3>
  )
}