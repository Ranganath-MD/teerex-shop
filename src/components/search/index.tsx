import { Container, Input, Image } from "@mantine/core";
import { useProducts } from "../../context";
import SearchIcon from "../../assets/search.svg";

export const Search = () => {
  const { productDispatch } = useProducts();

  const handleSearch = (e: any) => {
    productDispatch({ type: "SET_SEARCH_VALUE", payload: e.target.value });
  };

  return (
    <Container size="xs" px="xs" m={"md"}>
      <Input
        icon={<Image src={SearchIcon} alt="search" width="20px" />}
        placeholder="Search products"
        onChange={handleSearch}
      />
    </Container>
  );
};
