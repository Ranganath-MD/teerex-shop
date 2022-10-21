import React, { useMemo } from "react";
import {
  Group,
  Text,
  Card,
  Image,
  Indicator,
  Button,
} from "@mantine/core";

interface ICartProps extends Product {
  onDelete: (id: number) => void;
  increment: (item: Product) => void;
  decrement: (item: Product) => void;
}

const Item: React.FC<ICartProps> = ({
  onDelete,
  increment,
  decrement,
  ...props
}) => {

  const totalAmount = useMemo(
    () => (props.price as number) * (props.count as number),
    [props.count, props.price]
  );

  return (
    <Card shadow="sm" radius="md" withBorder mt="md" mb="xs">
      <Group position="apart" align="flex-end">

        <Group align="flex-start">
          <Indicator
            dot
            inline
            size={16}
            offset={7}
            position="bottom-end"
            color={"black"}
            label={props.gender}
          >
            <Image
              src={props.imageURL}
              alt={props.name}
              width={100}
              height="auto"
              radius="lg"
            />
          </Indicator>

          <div>
            <Text weight={500} size="lg">
              {props.name}
            </Text>

            <Text weight={500} size="lg" color={"cyan"} mb="sm">
              RS: {totalAmount}
            </Text>

            <Button.Group>
              <Button
                size="xs"
                compact
                disabled={props.count === 1}
                onClick={() => decrement({ ...props })}
              >
                -
              </Button>
              <Button size="xs" compact color={"gray"}>
                <Text size="md">{props.count}</Text>
              </Button>
              <Button
                size="xs"
                compact
                disabled={props.count === props.quantity}
                onClick={() => increment({ ...props })}
              >
                +
              </Button>
            </Button.Group>
          </div>
        </Group>

        <Button color="red" size="xs" onClick={() => onDelete(props.id)} compact>
          Delete
        </Button>
      
      </Group>
    </Card>
  );
};

export const CartItem = React.memo(Item)
