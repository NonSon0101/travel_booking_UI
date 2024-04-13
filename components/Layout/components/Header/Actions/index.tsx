import { Box, HStack } from "@chakra-ui/react";
import { PiTicketBold } from "react-icons/pi";
import { LuShoppingCart } from "react-icons/lu";
import UserProfile from "components/Layout/components/Header/UserProfile";
import ActionItem from "./ActionItem";
import { useStores } from "hooks";
import { useEffect } from "react";
import { observer } from "mobx-react";

interface IHeaderProps {
  openLoginModal: () => void;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

const Action = (props: IHeaderProps) => {
  const { cartStore } = useStores();
  const { authStore } = useStores();
  const { cartCount } = cartStore;
  const { isLogin } = authStore;

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    cartStore.fetchCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cartCount);

  const { openLoginModal, color, underLineHoverColor, hoverColor } = props;
  return (
    <HStack
      height="100%"
      justifyContent="center"
      alignItems="center"
      marginTop="14px"
    >
      <ActionItem
        color={color}
        underLineHoverColor={underLineHoverColor}
        hoverColor={hoverColor}
        actionIcon={<PiTicketBold />}
        title="Booking"
        to="/wish-list"
      />
      <Box
        {...(cartStore.cartCount !== 0 &&
          isLogin && {
            _before: {
              position: "absolute",
              content: `"${cartCount}"`,
              textAlign: "center",
              fontSize: "13px",
              top: "0",
              marginLeft: "30px",
              marginTop: "13px",
              width: "20px",
              height: "20px",
              background: "#CB3F00",
              color: "#fff",
              borderRadius: "full",
            },
          })}
      >
        <ActionItem
          color={color}
          underLineHoverColor={underLineHoverColor}
          hoverColor={hoverColor}
          actionIcon={<LuShoppingCart />}
          title="Cart"
          to="/cart"
        />
      </Box>
      <UserProfile
        underLineHoverColor={underLineHoverColor}
        hoverColor={hoverColor}
        color={color}
        openLoginModal={openLoginModal}
      />
    </HStack>
  );
};

export default observer(Action);
