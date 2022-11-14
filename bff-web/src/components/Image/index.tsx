export const defaultImageProps = {
  source: '',
}

type ImageProps = typeof defaultImageProps;

export default function Image({source}: ImageProps) {
  return (
    <img 
      src={source}
      width="412px"
    />
  )
}