"use client";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import Map from "@/components/Map";
import Card from "@/components/Card";

export default function ToiletsPage() {
  const [toilets, setToilets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const col = collection(db, "toilets");
    const q = query(col, orderBy("avgRating", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setToilets(items);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const markers = useMemo(
    () =>
      toilets
        .filter((t) => t?.location?.lat && t?.location?.lng)
        .map((t) => ({
          id: t.id,
          name: t.name ?? "이름 없음",
          lat: t.location.lat,
          lng: t.location.lng,
          rating: t.avgRating ?? 0,
        })),
    [toilets]
  );

  return (
    <Card
      title="지도"
      subtitle={
        loading ? "주변 화장실 불러오는 중..." : "주변 공공 화장실 위치"
      }
    >
      <Map markers={markers} />
    </Card>
  );
}
