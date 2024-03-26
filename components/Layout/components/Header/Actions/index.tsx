import { Box, HStack } from "@chakra-ui/react";
import { PiTicketBold } from "react-icons/pi";
import { LuShoppingCart } from "react-icons/lu";
import UserProfile from "components/Layout/components/Header/UserProfile";
import ActionItem from "./ActionItem";

interface IHeaderProps {
  openLoginModal: () => void;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

const Action = (props: IHeaderProps) => {
  const { openLoginModal, color, underLineHoverColor, hoverColor } = props;
  return (
    <HStack height="100%" justifyContent="center" alignItems="center">
      <ActionItem
        color={color}
        underLineHoverColor={underLineHoverColor}
        hoverColor={hoverColor}
        actionIcon={<PiTicketBold />}
        title="Booking"
        to="/wish-list"
      />
      <Box
        _before={{
          position: "absolute",
          content: '"1"',
          textAlign: "center",
          fontSize: "13px",
          top: "0",
          marginLeft: "26px",
          width: "20px",
          height: "20px",
          background: "#CB3F00",
          color: "#fff",
          borderRadius: "999",
        }}
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

export default Action;
