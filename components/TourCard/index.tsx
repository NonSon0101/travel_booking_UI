import { Box, Img, Text, VStack, HStack, Link } from "@chakra-ui/react";
import Icon from "components/Icon";
import { border } from "themes/globalStyles";
import { ITour } from "interfaces/tour";
interface ITourCard {
  tour: ITour;
}

const TourCard = (props: ITourCard) => {
  const { tour } = props;

  const src = `${tour.images}`;

  return (
    <Link href={`/tour-detail/${tour._id}`} _hover={{ textDecoration: "none" }}>
      <Box
        border={border}
        height="449px"
        width="288px"
        borderRadius={8}
        boxShadow="md"
        cursor="pointer"
        borderBlock="1px solid #dcdfe4"
        overflow="hidden"
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

        <VStack fontSize="lg" align="flex-start" padding="8px 12px 0px">
          <Text>Hiking</Text>
          <Text color="gray.800" fontWeight={700} lineHeight={1} mb="4px">
            {tour.title}
          </Text>
          <Text fontSize="md" mb="4px" fontWeight="500">
            2 hours
          </Text>
          <HStack spacing={4}>
            <HStack marginBottom={1}>
              <Icon iconName="yellow-star.svg" size={18} />
              <Icon iconName="yellow-star.svg" size={18} />
              <Icon iconName="yellow-star.svg" size={18} />
              <Icon iconName="yellow-star.svg" size={18} />
              <Icon iconName="yellow-star.svg" size={18} />
            </HStack>
            <Text>4.9/5</Text>
            <Text fontSize="sm" textDecoration="underline">
              3456 reviews
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="600">
            From {tour.regularPrice} VND
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default TourCard;
