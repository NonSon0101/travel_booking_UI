import { Link, VStack, Text } from "@chakra-ui/react";
import { color } from "framer-motion";
import { ReactNode } from "react";

interface IActionItemProps {
  actionIcon: ReactNode;
  title: string;
  to?: string;
  color?: string;
  underLineHoverColor?: string;
  hoverColor?: string;
}

const ActionItem = (props: IActionItemProps) => {
  const { actionIcon, title, to, color, underLineHoverColor, hoverColor } =
    props;

  return (
    <Link href={to} _hover={{ textDecoration: "none" }}>
      <VStack
        fontSize="md"
        {...(color ? { color: `${color}` } : { color: "#fff" })}
        margin="0px 16px"
        lineHeight="8px"
        _after={{
          content: '""',
          backgroundColor: "#transparent",
          mt: "4px",
          height: "2px",
          width: "0px",
          transition: "width .1s ease-in",
        }}
        _hover={{
          "&::after": {
            width: "100%",
            backgroundColor: underLineHoverColor ? underLineHoverColor : "#fff",
          },
          color: hoverColor ? hoverColor : "#fff",
        }}
      >
        <Text fontSize="2xl">{actionIcon}</Text>
        <Text>{title}</Text>
      </VStack>
    </Link>
  );
};

export default ActionItem;
