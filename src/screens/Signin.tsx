import { Center, Icon, Text } from "native-base";
import LogoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import {useAuth} from '../hooks/useAuth'


export function Signin() {

  const {signIn, user} =useAuth()

  

  return (
    <Center flex={1} bgColor="gray.700" p="7">
      <LogoImg width={212} height={40} />

      <Button
        title="Sign in with Google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        mt={12}
        onPress={signIn}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua
        conta.
      </Text>
    </Center>
  );
}
