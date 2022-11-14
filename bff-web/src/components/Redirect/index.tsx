export const defaultRedirectProps = {
  link: '',
}

type RedirectProps = typeof defaultRedirectProps;

export default function Redirect({link}: RedirectProps) {
  return (
    <a href={link} target="_blank" rel="noreferrer noopener">Ver mais</a>
  )
}