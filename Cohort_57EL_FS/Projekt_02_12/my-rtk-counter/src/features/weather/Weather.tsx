// src/features/weather/Weather.tsx
import { useState } from "react";
import { useGetWeatherQuery } from "./types/weatherApi";
import { useTranslation } from "react-i18next";
import styles from "./Weather.module.css";

const Weather = () => {
  const [city, setCity] = useState("Berlin");
  const { data, error, isLoading } = useGetWeatherQuery(city, { skip: !city });
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      {/* Sprachumschalter oben rechts */}
      <select
        className={styles.langSwitch}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="en">EN</option>
        <option value="de">DE</option>
        <option value="ru">RU</option>
      </select>

      <div className={styles.card}>
        <h1 className={styles.title}>{t("title")}</h1>

        <input
          type="text"
          placeholder={t("enterCity")}
          value={city}
          className={styles.input}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCity((e.target as HTMLInputElement).value);
            }
          }}
        />

        <button className={styles.button}>{t("getWeather")}</button>

        {isLoading && <p className={styles.loading}>{t("loading")}</p>}
        {error && <p className={styles.error}>{t("error")}</p>}

        {data && (
          <div className={styles.weatherBox}>
            <h2>
              {data.name}, {data.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
            />
            <p>{t("temperature")}: {data.main.temp}°C</p>
            <p>{t("feelsLike")}: {data.main.feels_like}°C</p>
            <p>{t("humidity")}: {data.main.humidity}%</p>
            <p>{t("wind")}: {data.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
