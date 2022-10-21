import { useMemo } from "react";
import {
  Header,
  Text,
  Group,
  ActionIcon,
  Indicator,
  Image,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

import { useCart } from "../../context";
import CartImage from "../../assets/cart.svg";
import SunImage from "../../assets/sun.svg";
import MoonImage from "../../assets/moon.svg";


export const TeeRexHeader = () => {
  const {
    cartState: { cart },
  } = useCart();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const totalCartItems = useMemo(() => {
    return cart.reduce((acc: number, current: any) => acc + current.count, 0);
  }, [cart]);

  return (
    <Header height={60} p="md" fixed>
      <Group px={20} position="apart">
        <Text size={"lg"} weight="bold">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            TeeRex Store
          </Link>
        </Text>

        <Group>
          <Indicator label={totalCartItems} inline size={22} color="green">
            <Link to={"/cart"}>
              <ActionIcon variant="filled" size={30}>
                <Image
                  src={CartImage}
                  alt="Cart Image"
                  width={20}
                  height={20}
                />
              </ActionIcon>
            </Link>
          </Indicator>

          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? (
              <Image src={SunImage} alt="light mode" width={15} />
            ) : (
              <Image src={MoonImage} alt="dark mode" width={15} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </Header>
  );
};
