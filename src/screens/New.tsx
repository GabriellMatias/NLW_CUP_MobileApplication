import { Heading, VStack, Text } from "native-base";
import { Header } from "../components/Header";
import LogoImg from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Create New Pool" />
      <VStack mt={8} mx={5} alignItems="center">
        <LogoImg />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Create you own Pool Cup and share it with your friends!
        </Heading>

        <Input mb={2} placeholder="Whats yours Pool Name" />

        <Button title="Create My Pool" />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After create your pool, you will recive an unique code that can be use
          to invite others people.
        </Text>
      </VStack>
    </VStack>
  );
}
