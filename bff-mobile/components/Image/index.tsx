import { Image, StyleSheet } from "react-native";

type ImageProps = {
  source: string;
}

export function MyImage({ source }: ImageProps) {
  return (
    <Image
      style={styles.image}
      source={{ uri: source }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 128,
  },
});