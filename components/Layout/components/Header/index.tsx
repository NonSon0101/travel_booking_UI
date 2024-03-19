import { HStack, Img } from "@chakra-ui/react";
import Action from "./Actions";
import SearchBarInput from "./SearchBarInput";

interface IHeader {
  openLoginModal: () => void;
  background?: string;
  bgGradient?: string;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

const Header = (props: IHeader) => {
  const {
    openLoginModal,
    background,
    bgGradient,
    color,
    underLineHoverColor,
    hoverColor,
  } = props;
  return (
    <HStack
      width="full"
      height="80px"
      paddingX={8}
      {...(bgGradient
        ? { bgGradient: `${bgGradient}` }
        : { background: `${background}` })}
    >
      <HStack
        margin="0px 253px"
        padding="0px 96px"
        justifyContent="space-between"
        height="100%"
        width="73.4%"
      >
        <HStack spacing={10}>
          <Img
            src="assets/images/logo.jpg"
            alt="logo"
            boxSize="50px"
            cursor="pointer"
          />
          <SearchBarInput placeholder="Search tours by name" />
        </HStack>
        <Action
          openLoginModal={openLoginModal}
          color={color}
          hoverColor={hoverColor}
          underLineHoverColor={underLineHoverColor}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
