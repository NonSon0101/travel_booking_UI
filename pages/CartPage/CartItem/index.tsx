import {
  HStack,
  VStack,
  Text,
  Image,
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";

import { TfiTicket } from "react-icons/tfi";
import { IoPeople, IoTimerOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import {
  IDeleteCart,
  IParticipants,
  ITourCart,
  IUpdateToCart,
} from "interfaces/cart";
import { useEffect, useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { FaCheckSquare } from "react-icons/fa";
import { useStores } from "hooks";
import CustomCalendar from "pages/TourDetailPage/Calendar";
import MenuItem from "pages/TourDetailPage/MenuItem";
import { PLATFORM } from "enums/common";

interface ICartItem {
  tour: ITourCart;
  idCart: string;
  caculateTourPrice: (tourPrice: number) => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CartItem = (props: ICartItem) => {
  const { tour, idCart, caculateTourPrice } = props;
  const [convertDate, setConvertDate] = useState<string>();
  const [tourPrice, setTourPrice] = useState<number>(0);
  const [editTour, setEditTour] = useState<boolean>(false);
  const [guestInfo, setGuestInfo] = useState<IParticipants[]>(
    tour.participants
  );
  const [selectedDate, setSelectedDate] = useState<Value>(null);
  const [showDate, setShowDate] = useState<string[]>([]);
  const [updateDate, setUpdateDate] = useState<string>("");

  const [type, setType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [isMenuParticipant, setIsMenuParticipant] = useState<boolean>(true);
  const [isMenuDatePick, setIsMenuDatePick] = useState<boolean>(true);
  const [initialMount, setInitialMount] = useState(true);

  const { cartStore } = useStores();

  useEffect(() => {
    const timeStamp: string = tour.startDate;
    const date: Date = new Date(timeStamp);
    const formattedDate: string = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setConvertDate(formattedDate);
  }, [tour.startDate]);

  useEffect(() => {
    let totalPrice = 0;

    tour.participants.forEach((tour) => {
      totalPrice += tour.price;
    });

    setTourPrice(totalPrice);
  }, [tour.participants]);

  useEffect(() => {
    caculateTourPrice(tourPrice);
  }, [tourPrice]);

  useEffect(() => {
    if (!initialMount) {
      const existingGuestIndex = guestInfo.findIndex(
        (obj) => obj.title === type
      );

      if (existingGuestIndex !== -1) {
        const updatedGuestInfo = [...guestInfo];
        updatedGuestInfo[existingGuestIndex] = {
          ...updatedGuestInfo[existingGuestIndex],
          quantity,
          price,
        };
        const filterGuest = updatedGuestInfo.filter(
          (obj) => obj.quantity !== 0 && !!obj.title
        );
        setGuestInfo(filterGuest);
      } else {
        const newGuest: IParticipants = {
          title: type,
          quantity: quantity,
          price: price,
        };
        setGuestInfo((prevGuestInfo) => [...prevGuestInfo, newGuest]);
      }
    } else {
      setInitialMount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, quantity, price]);

  useEffect(() => {
    if (!selectedDate) return;
    console.log(selectedDate);
    var date = new Date(selectedDate.toString());

    var formattedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    console.log(formattedDate);

    const showDate = selectedDate.toString().split(" ").slice(0, 3);
    setShowDate(showDate);
    setUpdateDate(formattedDate.toString());
  }, [selectedDate]);

  function handleEditTour() {
    setEditTour((prev) => !prev);
  }

  function handleCommand() {
    const userId = localStorage.getItem(`${PLATFORM.WEBSITE}UserId`);
    if (userId) {
      if (editTour) {
        const data: IUpdateToCart = {
          user: userId,
          tour: {
            itemId: tour.tour._id,
            startDate: updateDate,
            startTime: "7h00",
            participants: guestInfo,
          },
        };
        console.log("data", data);
        cartStore.updateCart(data);
      } else {
        const data: IDeleteCart = {
          user: userId,
          itemId: idCart,
        };
        cartStore.deleteCart(data);
      }
    }
  }

  return (
    <VStack align="flex-start">
      <Text textAlign="start" fontSize="xl" fontWeight="500" color="#636A80">
        {convertDate}
      </Text>
      <HStack
        width="full"
        minWidth="600px"
        height="fit-content"
        padding="12px"
        border="1px solid #ccc"
        borderRadius="8px"
      >
        <VStack alignSelf="flex-start">
          <Image
            borderRadius="8px"
            width="96px"
            height="96px"
            src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
            alt="img"
          />
        </VStack>
        <VStack align="self-start" flex="1" fontSize="md" fontWeight="500">
          <Link
            href={`/tour-detail/${tour.tour._id}`}
            _hover={{ textDecoration: "none" }}
          >
            <Text fontSize="xl" fontWeight="bold">
              {tour.tour.title}
            </Text>
          </Link>
          <HStack>
            <TfiTicket />
            <Text> Sunrise or Sunset Jeep Tour</Text>
          </HStack>
          <HStack>
            {!editTour ? (
              <>
                <IoTimerOutline />
                <Text>
                  {convertDate} {tour.startTime}
                </Text>
              </>
            ) : (
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
                      <Text>
                        {!selectedDate ? `${convertDate}` : `${showDate}`}
                      </Text>
                    </HStack>
                    <TriangleDownIcon />
                  </HStack>
                </MenuButton>

                <MenuList>
                  <HStack spacing={8}>
                    <CustomCalendar
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                    />
                  </HStack>
                </MenuList>
              </Menu>
            )}
          </HStack>
          <HStack>
            {!editTour ? (
              <>
                <MdPeopleAlt />
                {tour.participants.map((participant) => (
                  <Text key={participant._id}>
                    {participant.quantity} {participant.title}
                  </Text>
                ))}
              </>
            ) : (
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
                        <Text>
                          {guestInfo.length > 0
                            ? guestInfo.map(
                                (guest) => `${guest.title} x${guest.quantity} `
                              )
                            : "Select participant"}
                        </Text>
                      </HStack>
                      <TriangleDownIcon />
                    </HStack>
                  </MenuButton>
                </VStack>
                <MenuList minWidth="320px" padding="4px 10px">
                  {tour.participants.map((participant) => (
                    <MenuItem
                      quantity={participant.quantity}
                      key={participant._id}
                      type={participant.title}
                      price={participant.price}
                      setPrice={setPrice}
                      setType={setType}
                      setQuantity={setQuantity}
                    />
                  ))}
                </MenuList>
              </Menu>
            )}
          </HStack>
          <HStack>
            <FaRegCheckCircle />
            <Text>Free cancellation</Text>
          </HStack>
          <HStack width="full" justifyContent="space-between">
            <HStack>
              <Button borderRadius="full" onClick={handleEditTour}>
                {!editTour ? (
                  <>
                    <GoPencil />
                    <Text>Edit</Text>
                  </>
                ) : (
                  "Cancel"
                )}
              </Button>
              <Button borderRadius="full" onClick={handleCommand}>
                {!editTour ? (
                  <FaTrashAlt color="red" />
                ) : (
                  <FaCheckSquare color="green" />
                )}
              </Button>
            </HStack>
            <Text>{tourPrice}</Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default CartItem;
