import type { JSX } from "react";
interface BikeProps {
    gears: number;
    brand: string;
    price: number;
    image?: string;
}

export default function Bike(props:BikeProps): JSX.Element {
  const{ gears, brand, price } = props;
  return (
    <div>
      Brand: {brand} Gears: {gears} Price: €{price}
    </div>
  )
}
