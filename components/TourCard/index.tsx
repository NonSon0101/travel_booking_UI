import { Box, Img, Text, VStack, HStack } from "@chakra-ui/react";
import Icon from "components/Icon";
import { border } from "themes/globalStyles";
import { ITour } from "interfaces/tour";
import { useRouter } from "next/navigation";
import routes from "routes";

interface ITourCard {
  tour: ITour;
}

const TourCard = (props: ITourCard) => {
  const { tour } = props;

  const router = useRouter();
  const src = `${tour.images}`;

  function gotoTourDetailPage(): void {
    router.push(routes.detail.value(10));
  }

  return (
    <Box
      border={border}
      height="449px"
      width="288px"
      borderRadius={8}
      boxShadow="md"
      cursor="pointer"
      borderBlock="1px solid #dcdfe4"
      overflow="hidden"
      onClick={gotoTourDetailPage}
      _hover={{
        "& img": {
          transform: "scale(1.2)",
        },
      }}
    >
      <Box width="full" height="260px" overflow="hidden">
        <Img
          height="260px"
          src={src}
          objectFit="cover"
          borderTopRadius={8}
          transition="transform .5s ease"
        />
      </Box>

      <VStack fontSize="1.6rem" align="flex-start" padding="8px 12px 0px">
        <Text>Hiking</Text>
        <Text color="gray.800" fontWeight={700} lineHeight={8} mb="8px">
          {tour.title}
        </Text>
        <Text fontSize="1.2rem" mb="8px" fontWeight="500">
          2 hours
        </Text>
        <HStack spacing={4}>
          <HStack marginBottom={1}>
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
            <Icon iconName="yellow-star.svg" size={20} />
          </HStack>
          <Text>4.9 / 5</Text>
          <Text fontSize="sm" textDecoration="underline">
            3456 reviews
          </Text>
        </HStack>
        <Text fontSize="1.4rem" fontWeight="600">
          {tour.regularPrice}
        </Text>
      </VStack>
    </Box>
  );
};

export default TourCard;
