import { Heading, VStack, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import LogoImg from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import {api} from '../services/api'

export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "Enter a name to your Pool",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true)
      
      await api.post('/pools', {title: title.toUpperCase()})

      toast.show({
        title: "Pool Created successfully",
        placement: "top",
        bgColor: "green.500",
      });
      setTitle("")
      
    } catch (error) {
      console.log(error)

      toast.show({
        title: "Cannot Create a Pool",
        placement: "top",
        bgColor: "red.500",
      });
    }finally{
      setIsLoading(false)
    }
  }

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

        <Input
          mb={2}
          placeholder="Whats yours Pool Name"
          /* resume todo o role pra pegar um valor de input com useState */
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="Create My Pool"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After create your pool, you will recive an unique code that can be use
          to invite others people.
        </Text>
      </VStack>
    </VStack>
  );
}
