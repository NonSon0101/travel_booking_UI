import { HStack } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa6";
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
        actionIcon={<FaRegHeart />}
        title="Wishlist"
        to="/wish-list"
      />
      <ActionItem
        color={color}
        underLineHoverColor={underLineHoverColor}
        hoverColor={hoverColor}
        actionIcon={<LuShoppingCart />}
        title="Cart"
        to="/cart"
      />
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
