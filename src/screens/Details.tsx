import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import {useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { PoolProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from "react-native";
import {Guesses} from '../components/Guesses'

interface RouteParamsProps {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolProps>({} as PoolProps);
  const [optionSelected, setOptionSelected] = useState<
    "Your Guesses" | "Groups Ranking"
  >("Your Guesses");
  const route = useRoute();
  const toast = useToast();
  const { id } = route.params as RouteParamsProps;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      toast.show({
        title: "Unable to load Pool Details",
        placement: "top",
        bgColor: "red.500",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleShareCode() {
     await Share.share({
      message: poolDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={poolDetails.title} showBackButton showShareButton onShare={handleShareCode}/>

      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Your Guesses"
              isSelected={optionSelected === "Your Guesses"}
              onPress={() => setOptionSelected("Your Guesses")}
            />
            <Option
              title="Groups Ranking"
              isSelected={optionSelected === "Groups Ranking"}
              onPress={() => setOptionSelected("Groups Ranking")}
            />
          </HStack>

          <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
