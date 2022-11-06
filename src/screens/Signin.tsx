import { Center, Icon, Text } from "native-base";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

export function Signin() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="gray.700" p="7">
      <LogoImg width={212} height={40} />

      <Button
        title="Sign in with Google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: "white" } }}
      />

      <Text color="white" textAlign="center" mt={4}>
        We dont use any information {"\n"}
        than your email to create your account
      </Text>
    </Center>
  );
}
