import { Heading, VStack} from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Search by code" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Find your Pool by an unique code
        </Heading>

        <Input mb={2} placeholder="Whats the pool code" />

        <Button title="Search Pool" />

        
      </VStack>
    </VStack>
  );
}
