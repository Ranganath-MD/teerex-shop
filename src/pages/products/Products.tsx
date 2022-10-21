import { useCallback, useState, useEffect } from "react";
import {
  Grid,
  Loader,
  Text,
  Notification,
  Drawer,
  ActionIcon,
  Image,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { Product, Search, Filters } from "../../components";
import { useCart, useProducts } from "../../context";
import FilterIcon from "../../assets/filter.svg";

const url =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

export const Products = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const { productState, productDispatch } = useProducts();
  const { cartDispatch } = useCart();

  const matches = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const res = await (
          await fetch(url, { signal: controller.signal })
        ).json();
        setError(false);
        productDispatch({ type: "GET_PRODUCTS", payload: res });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddtoCart = useCallback((_: any, item: Product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: item });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Group align={"center"}>
        <Search />
        {matches && (
          <ActionIcon onClick={() => setOpened(true)}>
            <Image src={FilterIcon} alt="filter icon" />
          </ActionIcon>
        )}
      </Group>

      {loading && <Loader color="violet" />}

      {error && (
        <Notification color="red" title="Error" disallowClose>
          Unable to fetch products at the moment
        </Notification>
      )}

      {productState.products.length === 0 && !loading && !error ? (
        <Text>No records to display</Text>
      ) : (
        <Grid p={20}>
          {productState.products?.map((product: any) => (
            <Grid.Col xs={6} sm={4} md={3} key={product.id}>
              <Product {...product} handleAddtoCart={handleAddtoCart} />
            </Grid.Col>
          ))}
        </Grid>
      )}

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Filters"
        padding="xl"
        size="sm"
        position="right"
      >
        <Filters device="mobile" />
      </Drawer>
    </>
  );
};
