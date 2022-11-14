import { Text } from "react-native";

type TitleProps = {
  text: string;
}

export function Title({ text }: TitleProps) {
  return (
    <Text>{text}</Text>
  );
}