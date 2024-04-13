"use client";
import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import PageLayout from "components/Layout/PageLayout";
import CartItem from "./CartItem";
import { useStores } from "hooks";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";

const CartPage = () => {
  const { cartStore } = useStores();
  const { authStore } = useStores();
  const { listCart } = cartStore;
  const { isLogin } = authStore;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!isLogin) return;
    const fetchData = async () => {
      console.log("mounted");
      await cartStore.getListCart();
    };
    fetchData();
  }, []);

  function caculateTourPrice(tourPrice: number): void {
    if (tourPrice) {
      setTotalPrice((prev) => prev + tourPrice);
    }
  }

  return (
    <PageLayout>
      <HStack
        maxWidth="1300px"
        minHeight="700px"
        width="full"
        height="full"
        align="flex-start"
        justifyContent="space-between"
        padding="8px 20px"
      >
        <VStack width="full" height="full" align="flex-start" flex="2">
          <Text textAlign="start" fontSize="2xl" fontWeight="800">
            Shopping Cart
          </Text>
          {listCart &&
            listCart.tours &&
            listCart.tours.map((tour) => (
              <CartItem
                key={tour._id}
                tour={tour}
                idCart={tour._id}
                caculateTourPrice={caculateTourPrice}
              />
            ))}
        </VStack>

        {listCart.tours && listCart.tours.length && (
          <VStack position="relative" width="full" flex="1">
            <VStack
              width="full"
              maxWidth="400px"
              height="fit-content"
              padding="12px"
              border="1px solid #ccc"
              borderRadius="8px"
              position="fixed"
            >
              <HStack
                width="full"
                justifyContent="space-between"
                spacing={50}
                fontSize="lg"
                fontWeight="bold"
              >
                <Text>Subtotal ({listCart.tours.length} items): </Text>
                <Text>{totalPrice}</Text>
              </HStack>
              <Button
                width="full"
                padding="18px"
                borderRadius="full"
                background="#38A59F"
                color="white"
              >
                Go to check out
              </Button>
              <VStack align="self-start"></VStack>
            </VStack>
          </VStack>
        )}
      </HStack>
      {(!isLogin || !listCart.tours) && (
        <Text fontSize="2xl" fontWeight="bold">
          Your cart is empty{" "}
        </Text>
      )}
    </PageLayout>
  );
};

export default observer(CartPage);
