"use client";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function ToiletDetailPage({ params }) {
  const { id } = params;
  const [toilet, setToilet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const run = async () => {
      const snap = await getDoc(doc(db, "toilets", id));
      setToilet(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      setLoading(false);
    };
    run();
  }, [id]);

  const submitReview = async () => {
    if (!user) return alert("로그인이 필요합니다");
    if (!rating || rating < 1 || rating > 5)
      return alert("1~5점 사이로 선택해주세요");
    await addDoc(collection(db, "toilets", id, "reviews"), {
      userId: user.uid,
      userName: user.displayName ?? user.email,
      rating,
      text,
      createdAt: serverTimestamp(),
    });
    alert("리뷰가 등록되었습니다");
    setText("");
    setRating(5);
  };

  if (loading) return <div>불러오는 중...</div>;
  if (!toilet) return <div>화장실을 찾을 수 없습니다.</div>;

  return (
    <div className="space-y-6">
      <Card title={toilet.name ?? "이름 없음"} subtitle="상세 정보">
        <div className="space-y-2">
          <div>평균 평점: {(toilet.avgRating ?? 0).toFixed(1)}</div>
          {toilet?.location && (
            <div className="text-sm text-gray-600">
              위치: {toilet.location.lat}, {toilet.location.lng}
            </div>
          )}
        </div>
      </Card>

      <Card title="리뷰 작성" subtitle="별점과 후기를 남겨주세요">
        <div className="space-y-4">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}점
              </option>
            ))}
          </select>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="리뷰 내용을 입력하세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={submitReview} variant="primary">
            리뷰 등록
          </Button>
        </div>
      </Card>
    </div>
  );
}
