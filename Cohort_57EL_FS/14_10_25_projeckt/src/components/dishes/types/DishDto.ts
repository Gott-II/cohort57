// DishDto.ts
export interface DishDto {
  id?: string; // optional, falls vom Backend vergeben
  title: string; // Name des Gerichts
  category: string; // Kategorie (z. B. Vorspeise, Hauptgericht, Nachspeise)
  price: number; // Preis in Euro
  image: string; // Bild-URL
}
