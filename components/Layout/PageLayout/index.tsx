"use client";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import LoginModal from "../components/LoginModal";
import Footer from "components/Footer";

interface IPageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = (props: IPageLayoutProps) => {
  const { children } = props;
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  return (
    <VStack width="full" position="relative">
      <Header
        openLoginModal={() => setIsOpenLoginModal(true)}
        background="#transparent"
        color="#63687a"
        underLineHoverColor="#ff5533"
        hoverColor="#1a2b49"
      />
      {children}
      <LoginModal
        isOpen={isOpenLoginModal}
        onClose={() => setIsOpenLoginModal(false)}
      />
      <Footer />
    </VStack>
  );
};

export default PageLayout;
