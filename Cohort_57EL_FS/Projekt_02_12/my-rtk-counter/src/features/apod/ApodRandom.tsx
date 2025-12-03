import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



import type { AppDispatch, RootState } from "../../app/store";
import { fetchRandomApod } from "./apodSlice";
import ImageModal from "./ImageModal";

export default function ApodRandom() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.apod
  );

  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  useEffect(() => {
    dispatch(fetchRandomApod());
  }, [dispatch]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Загрузка...</h2>;
  if (error) return <h3>{error}</h3>;

  const openModal = (url: string, title: string) => {
    setModalImage(url);
    setModalTitle(title);
  };

  const closeModal = () => setModalImage(null);

  return (
    <>
      {modalImage && (
        <ImageModal url={modalImage} title={modalTitle} onClose={closeModal} />
      )}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px"
        }}
      >
        {items.map((item) => {
          // Используем HD-качество, если доступно
          const imageUrl = item.hdurl ?? item.url;

          return (
            <div
              key={item.date}
              style={{
                width: "300px",
                background: "#fff",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform .2s ease",
                cursor: "pointer"
              }}
              onClick={() => openModal(imageUrl, item.title)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={imageUrl}
                alt={item.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <h3 style={{ marginTop: "10px", fontSize: "18px", color:"black" }}>
                {item.title}
              </h3>

              <p style={{ fontSize: "14px", opacity: 0.7 }}>
                {item.date}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
