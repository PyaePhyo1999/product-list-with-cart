import { useMemo, useState } from "react";

export type CartRecord<T> = Record<string, T & { qty: number }>;
export function useCart<T extends { name: string; price: number }>(productsKey = "name") {
    const [cart, setCart] = useState<CartRecord<T>>({});

    const add = (item: T) => {
    setCart((prev) => {
      const key = item.name; // use id if you have one
      const existing = prev[key];
      return {
        ...prev,
        [key]: existing ? { ...existing, qty: existing.qty + 1 } : { ...item, qty: 1 },
      };
    });
  };

  const inc = (key: string) => {
    setCart((prev) => ({
      ...prev,
      [key]: { ...prev[key], qty: prev[key].qty + 1 },
    }));
  };

   const dec = (key: string) => {
    setCart((prev) => {
      const current = prev[key];
      if (!current) return prev;

      if (current.qty <= 1) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }

      return { ...prev, [key]: { ...current, qty: current.qty - 1 } };
    });
  };
    const remove = (key: string) => {
        setCart((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
     });
    };

    const clear = () => setCart({});

    const items = useMemo(() => Object.values(cart), [cart]);
    const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);
    const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);

    const qtyOf = (key: string) => cart[key]?.qty ?? 0;

    return { cart, items, count, total, add, inc, dec, remove, qtyOf, clear };
}