import type { JSX } from 'react';
interface CarProps {
  brand: string;
  color: string;
  image?: string;
}

export default function Car(props: CarProps): JSX.Element {
  const { brand, color, image } = props;
  return (
    <div style={{ backgroundColor: color, color: 'white' }}>
      Brand: {brand} {','}
      Color: {color}
      {props.image && (
        <div>
          <img src={props.image} alt={brand} width="300" />
        </div>
      )}
    </div>
  );
}
