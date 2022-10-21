import { Checkbox, Navbar, Text } from "@mantine/core";
import { useCallback } from "react";
import { useProducts } from "../../context";
import { IFilterObject } from "../../context/filters";

type Item = {
  item: IFilterObject;
  onChange: (value: string, id: string, checked: boolean) => void;
};

const FilterCategory: React.FC<Item> = ({ item, onChange }) => {
  return (
    <>
      <Text mt={10} color="dimmed">
        {item.name}
      </Text>
      {item.items.map((option) => {
        return (
          <Checkbox
            mt={10}
            size="xs"
            radius="xs"
            color="cyan"
            checked={option.checked}
            key={option.id}
            value={option.id}
            label={option.name}
            onChange={(e) =>
              onChange(e.target.value, item.id, e.target.checked)
            }
          />
        );
      })}
    </>
  );
};

interface IFilterProps {
  device?: "mobile" | "system";
}

export const Filters: React.FC<IFilterProps> = ({ device }) => {
  const { productState, productDispatch } = useProducts();

  const handleCheckBox = useCallback((value: string, category: string, checked: boolean) => {
    productDispatch({ type: "FILTER_VALUE", payload: { value, category, checked } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {device === "system" ? (
        <Navbar
          hidden
          fixed
          p="md"
          hiddenBreakpoint="sm"
          width={{ xs: 100, sm: 200, lg: 250 }}
        >
          {productState.filters?.map((item: IFilterObject) => (
            <FilterCategory
              item={item}
              key={item.id}
              onChange={handleCheckBox}
            />
          ))}
        </Navbar>
      ) : (
        <div>
          {productState.filters?.map((item: IFilterObject) => (
            <FilterCategory
              item={item}
              key={item.id}
              onChange={handleCheckBox}
            />
          ))}
        </div>
      )}
    </>
  );
};
