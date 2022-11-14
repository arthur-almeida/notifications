export const defaultTitleProps = {
  text: '',
}

type TitleProps = typeof defaultTitleProps;

export default function Title({text}: TitleProps) {
  return (
    <h1 style={{ margin: '0 16px' }}>{text}</h1>
  )
}