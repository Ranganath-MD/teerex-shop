import React, { useState } from "react";
import { Card, Image, Text, Button, Group } from "@mantine/core";

interface ProductCardProps extends Product {
  handleAddtoCart: (e: any, item?: Product) => void;
}

export const Product: React.FC<ProductCardProps> = React.memo((props) => {
  const [added, setAdded] = useState(false);
  const { handleAddtoCart, ...rest } = props;

  const handleAdd = (e: any) => {
    setAdded(true);
    handleAddtoCart(e, rest);
  };

  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src={rest.imageURL}
          height={160}
          alt={rest.name}
          withPlaceholder
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={"bold"}>{rest.name}</Text>
        <Text weight={"bold"} color="teal">
          Rs {rest.price}
        </Text>
      </Group>

      <Button
        variant={rest.quantity === 0 ? "outline" : added ? "light" : "gradient"}
        color={rest.quantity === 0 ? "red" : added ? "green" : "blue"}
        fullWidth
        mt="md"
        radius="md"
        onClick={(e: any) =>
          rest.quantity === 0 ? e.stopPropagation() : handleAdd(e)
        }
      >
        {rest.quantity === 0
          ? "Out of stock"
          : added
          ? "Added to cart"
          : "Add to cart"}
      </Button>
    </Card>
  );
});
