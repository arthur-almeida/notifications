export const defaultItemProps = {
  title: '',
  description: '',
}

type ItemProps = typeof defaultItemProps;

export default function Item({ title, description }: ItemProps) {
  return (
    <>
      <h4 style={{ margin: '64px 16px 8px' }}>{title}</h4>
      <p style={{ margin: '0 16px' }}>{description}</p>
    </>
  )
}