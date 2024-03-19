import {
  VStack,
  Box,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <footer style={{ width: "100%" }}>
      <Box
        fontSize="1.4rem"
        fontWeight="bold"
        width="full"
        height="362px"
        bg="#1a2b49"
        color="#fff"
      >
        <HStack margin="0px 51px" padding="0px 96px">
          <HStack>
            <Text>Languages</Text>
            <Menu>
              <MenuButton>
                <HStack></HStack>
              </MenuButton>
              <MenuList>
                <MenuItem></MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </HStack>
        <HStack>meomeomeo</HStack>
      </Box>
    </footer>
  );
};

export default Footer;
