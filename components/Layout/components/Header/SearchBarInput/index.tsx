"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import Tippy from "@tippyjs/react/headless";
import { Search2Icon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";
import SearchItem from "./SearchItem";
import { useDebounce } from "hooks";

interface ISearchInputProps {
  name?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
}

const SearchBarInput = (props: ISearchInputProps) => {
  const { value, placeholder, name, defaultValue } = props;
  const [isShow, setIsShow] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState([]);
  const [inputValue, setInputValue] = useState<string>("");
  const debounceVal = useDebounce({ value: inputValue, delay: 500 });

  const handleClickOutSide = () => {
    setIsShow(false);
  };

  useEffect(() => {
    if (!debounceVal.trim()) {
      setSearchResult([]);
      return;
    }

    fetch(
      `http://localhost:4001/api/v1/search/${encodeURIComponent(debounceVal)}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setSearchResult(res.metadata.suggestions);
      })
      .catch(() => {
        console.error("loi cmnr !!!!");
      });
  }, [debounceVal]);

  return (
    <Tippy
      interactive
      visible={isShow && searchResult.length > 0}
      render={() => (
        <VStack
          alignItems="center"
          justifyContent="center"
          width="515px"
          minHeight="100px"
          maxHeight="min(-156px + 100vh, 734px)"
          borderRadius="8px"
          padding="8px 16px 16px 16px"
          background="#fff"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 2px 12px"
        >
          {searchResult.map((tours) => (
            <SearchItem
              key={tours?._id}
              imgsrc={tours?.thumbnail}
              title={tours?.title}
            />
          ))}
        </VStack>
      )}
      onClickOutside={handleClickOutSide}
    >
      <HStack
        width="515px"
        height="56px"
        background="#fff"
        borderRadius="44px"
        border="2px solid #dcdfe4"
        justifyContent="space-between"
        padding="0px 8px"
        _focusWithin={{
          borderColor: "#0071eb",
        }}
      >
        <InputGroup padding="0px 16px">
          <InputLeftElement pointerEvents="none" width="40px" height="24px">
            <Search2Icon color="#1A2B49" boxSize="20px" />
          </InputLeftElement>
          <Input
            value={inputValue}
            placeholder={placeholder}
            paddingLeft={10}
            border="none"
            focusBorderColor="transparent"
            fontSize="1.8rem"
            fontWeight="700"
            onChange={(e) => {
              setInputValue(e.target.value);
              console.log(inputValue);
            }}
            onFocus={() => {
              setIsShow(true);
            }}
          />
        </InputGroup>
        <Button
          width="115px"
          height="42px"
          backgroundColor="#0071eb"
          color="#fff"
          fontSize="1.8rem"
          borderRadius="99px"
          transition="background .2s ease-out"
          _hover={{
            background: "#304c84",
            borderColor: "#304c84",
          }}
        >
          Search
        </Button>
      </HStack>
    </Tippy>
  );
};

export default SearchBarInput;
