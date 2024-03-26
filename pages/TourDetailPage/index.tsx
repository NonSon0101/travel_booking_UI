"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Img,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import Icon from "components/Icon";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { PiClockCountdownBold } from "react-icons/pi";
import { RiMapPinUserLine } from "react-icons/ri";
import { LuCalendarDays, LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import { IoPeople } from "react-icons/io5";
import PageLayout from "components/Layout/PageLayout";
import { TriangleDownIcon } from "@chakra-ui/icons";

const TourDetailPage = () => {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const tourId = urlParts[urlParts.length - 1];
  const [type, setType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [guest, setGuest] = useState({ type, quantity });

  const { tourStore } = useStores();
  const { tourDetail } = tourStore;

  useEffect(() => {
    tourStore.fetchTourDetail(tourId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId]);

  console.log(tourDetail);

  let src = "";
  if (tourDetail.images && tourDetail.images.length > 0) {
    src = tourDetail.images.slice(0, 1).toString();
  }

  return (
    <PageLayout>
      <VStack
        maxWidth="1300px"
        width="full"
        align="flex-start"
        spacing={4}
        padding={8}
      >
        <Heading color="gray.800" fontWeight={700} lineHeight={10}>
          {tourDetail.title}
        </Heading>
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
        <Img width="full" height="500px" src={src} borderRadius={8} />
        <HStack width="full" justify="space-between" paddingTop="32px">
          <VStack
            alignSelf="flex-start"
            flex={2}
            width="full"
            align="flex-start"
          >
            <Text fontSize="lg" paddingRight="30px">
              Enchanting by the ethereal beauty and tranquility of the sand
              dunes in Mui Ne. Join us on a surreal journey through nature,
              where destinations beckon you to explore their captivating allure
            </Text>
            <Text fontSize="2xl" fontWeight="bold" alignSelf="flex-start">
              About this activity
            </Text>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <FaRegCalendarCheck />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Free cancellation
                </Text>
                <Text>Cancel up to 24 hours in advance for a full refund</Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <FaCreditCard />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Reserve now & pay later
                </Text>
                <Text>
                  Keep your travel plans flexible — book your spot and pay
                  nothing today.
                </Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <PiClockCountdownBold />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Duration
                </Text>
                <Text>{tourDetail.duration} hours</Text>
              </VStack>
            </HStack>
            <HStack align="flex-start" padding="16px">
              <Text fontSize="3xl">
                <RiMapPinUserLine />
              </Text>
              <VStack align="flex-start">
                <Text fontSize="lg" fontWeight="bold">
                  Live tour guide
                </Text>
                <Text>English</Text>
              </VStack>
            </HStack>
            <Box
              width="full"
              height="fit-content"
              padding="16px"
              background="#1A2B49"
              borderRadius="15px"
            >
              <Text fontSize="2xl" fontWeight="bold" color="#fff">
                Select participant and date
              </Text>
              <HStack
                align="center"
                justifyContent="space-between"
                paddingTop="8px"
              >
                <Box flex={1}>
                  <Menu
                    autoSelect={false}
                    computePositionOnMount
                    placement="bottom-start"
                  >
                    <VStack>
                      <MenuButton
                        width="full"
                        height="40px"
                        background="#fff"
                        borderRadius="999px"
                        padding="8px 12px"
                        fontWeight="bold"
                      >
                        <HStack justifyContent="space-between">
                          <HStack fontSize="md" alignItems="center">
                            <Text fontSize="2xl">
                              <IoPeople />
                            </Text>
                            <Text>Adult x1</Text>
                          </HStack>
                          <TriangleDownIcon />
                        </HStack>
                      </MenuButton>
                    </VStack>
                    <MenuList minWidth="320px">
                      <HStack justifyContent="space-between" padding="4px 8px">
                        <VStack align="flex-start">
                          <Text>Adult</Text>
                          <Text>(Age 16-59)</Text>
                        </VStack>
                        <HStack spacing={7} fontSize="xl">
                          <LuMinusCircle />
                          <Text
                            width="32px"
                            height="32px"
                            textAlign="center"
                            border="1px solid"
                          >
                            1
                          </Text>
                          <LuPlusCircle />
                        </HStack>
                      </HStack>
                    </MenuList>
                  </Menu>
                </Box>

                <Box flex={1}>
                  <Menu
                    autoSelect={false}
                    computePositionOnMount
                    placement="bottom-start"
                  >
                    <MenuButton
                      width="full"
                      height="40px"
                      background="#fff"
                      borderRadius="999px"
                      padding="8px 12px"
                      fontWeight="bold"
                    >
                      <HStack justifyContent="space-between">
                        <HStack fontSize="md" alignItems="center">
                          <Text fontSize="2xl">
                            <LuCalendarDays />
                          </Text>
                          <Text>Select date</Text>
                        </HStack>
                        <TriangleDownIcon />
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <HStack>
                        <Calendar />
                        <Calendar />
                      </HStack>
                    </MenuList>
                  </Menu>
                </Box>

                <Button colorScheme="blue" borderRadius="80px" flex={1}>
                  Check availability
                </Button>
              </HStack>
            </Box>
          </VStack>
          <VStack alignSelf="flex-start" width="full" flex={1}>
            <VStack
              width="100%"
              align="flex-start"
              padding={4}
              border="3px solid #DCDFE4"
              borderTopColor="#0071EB"
              borderRadius={2}
              spacing={0}
            >
              <Text>From</Text>
              <HStack width="full" justify="space-between">
                <Text fontSize="2xl" fontWeight={700}>
                  {tourDetail.regularPrice}
                </Text>
                <Button colorScheme="blue" borderRadius="80px" width="60%">
                  Check availability
                </Button>
              </HStack>
              <Text>per person</Text>
              <HStack marginTop="24px !important" spacing={6}>
                <Icon iconName="card.svg" size={40} />
                <Text fontSize="sm">
                  Reserve now & pay later to book your spot and pay nothing
                  today
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </PageLayout>
  );
};

export default observer(TourDetailPage);
