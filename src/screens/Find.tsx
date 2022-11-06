import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const toast = useToast();
  const {navigate} = useNavigation()


  async function handleJoinPool() {
    try {
      setIsLoading(true);
      if(!code.trim()){
        return toast.show({
          title: 'Inform a code',
          placement: 'top',
          bgColor:'red.500'
        })
      }

      await api.post('/pools/join', {code})
      toast.show({
        title: "You join to a pool",
        placement: "top",
        bgColor: "green.500",
      })
      navigate('pools')


    } 
    catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Pool Not Found!") {
        return toast.show({
          title: "unable to find Poll",
          placement: "top",
          bgColor: "red.500",
        });
      }
      if (error.response?.data?.message === "You Already Join This Pool!") {
        return toast.show({
          title: "You Already Join This Pool!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "unable to find Poll",
        placement: "top",
        bgColor: "red.500",
      });
    } 
  }

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

          <Input
            mb={2}
            placeholder="Whats the pool code"
            autoCapitalize="characters"
            onChangeText={setCode}
          />

          <Button
            title="Search Pool"
            isLoading={isLoading}
            onPress={handleJoinPool}
          />
        </VStack>
      </VStack>
    )
}

