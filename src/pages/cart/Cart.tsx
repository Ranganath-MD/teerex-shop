/* eslint-disable react-hooks/exhaustive-deps */
import { Paper, Container, Stack, Text } from "@mantine/core";
import { useCallback, useMemo } from "react";

import { CartItem } from "../../components";
import { useCart } from "../../context";

export const Cart = () => {
  const {
    cartState: { cart },
    cartDispatch,
  } = useCart();

  const onDelete = useCallback((id: number) => {
    cartDispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const increment = useCallback((item: Product) => {
    cartDispatch({ type: "INCREASE_COUNT", payload: item });
  }, []);

  const decrement = useCallback((item: Product) => {
    cartDispatch({ type: "DECREASE_COUNT", payload: item });
  }, []);

  const totalCartAmout = useMemo(() => {
    return cart.reduce(
      (acc: number, current: Product) =>
        acc + (current.price as number) * (current.count as number),
      0
    );
  }, [cart]);

  return (
    <Container>
      {cart?.length === 0 ? (
        <h1>Cart is empty</h1>
      ) : (
        <>
          <Paper shadow="xs" p="md" withBorder>
            <Text size="lg" weight="bold" color={"green"}>
              Total: Rs {totalCartAmout}
            </Text>
          </Paper>
          {cart?.map((item: Product) => {
            return (
              <Stack>
                <CartItem
                  {...item}
                  key={item.id}
                  onDelete={onDelete}
                  increment={increment}
                  decrement={decrement}
                />
              </Stack>
            );
          })}
        </>
      )}
    </Container>
  );
};
