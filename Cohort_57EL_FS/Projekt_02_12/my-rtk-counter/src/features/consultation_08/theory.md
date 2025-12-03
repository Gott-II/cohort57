```bash
- https://api.nasa.gov/
- https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
- https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=3
```

```js
export interface ApodItem {
  date: string;
  explanation: string;
  media_type: "image" | "video";
  title: string;
  url: string;
  hdurl?: string;
}
```