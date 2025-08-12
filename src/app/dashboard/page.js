"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Card from "@/components/Card";
import Button from "@/components/Button";
import {
  collection,
  collectionGroup,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [recentReviews, setRecentReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [stats, setStats] = useState({ myReviewsCount: 0, favoritesCount: 0 });
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth");
      return;
    }

    // 최근 내 리뷰 (collectionGroup)
    const reviewsQ = query(
      collectionGroup(db, "reviews"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const unsubReviews = onSnapshot(reviewsQ, (snap) => {
      const items = snap.docs.map((d) => {
        const data = d.data();
        const parentToiletId = d.ref.parent?.parent?.id;
        return { id: d.id, toiletId: parentToiletId, ...data };
      });
      setRecentReviews(items);
    });

    // 즐겨찾기 (users/{uid}/favorites)
    const favCol = collection(db, "users", user.uid, "favorites");
    const unsubFav = onSnapshot(favCol, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setFavorites(items);
    });

    // 내 리뷰 총개수 집계
    (async () => {
      try {
        const countSnap = await getCountFromServer(
          query(collectionGroup(db, "reviews"), where("userId", "==", user.uid))
        );
        setStats((s) => ({ ...s, myReviewsCount: countSnap.data().count }));
      } catch {}
    })();

    // 상위 평점 화장실 TOP3
    const topQ = query(
      collection(db, "toilets"),
      orderBy("avgRating", "desc"),
      limit(3)
    );
    const unsubTop = onSnapshot(topQ, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTopRated(items);
    });

    return () => {
      unsubReviews();
      unsubFav();
      unsubTop();
    };
  }, [user, loading, router]);

  useEffect(() => {
    setStats((s) => ({ ...s, favoritesCount: favorites.length }));
  }, [favorites.length]);

  if (!user && !loading) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <div className="flex gap-2">
          <Link href="/toilets">
            <Button variant="primary">주변 화장실 보기</Button>
          </Link>
          <Link href="/auth">
            <Button variant="secondary">계정</Button>
          </Link>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="내 리뷰 수" subtitle="전체 누적">
          <div className="text-3xl font-semibold">{stats.myReviewsCount}</div>
        </Card>
        <Card title="즐겨찾기" subtitle="총 개수">
          <div className="text-3xl font-semibold">{stats.favoritesCount}</div>
        </Card>
        <Card
          title="내 정보"
          subtitle={user?.email ?? user?.displayName ?? "-"}
        >
          <div className="text-sm text-gray-600">UID: {user?.uid}</div>
        </Card>
      </div>

      {/* 최근 내 리뷰 */}
      <Card title="최근 내 리뷰" subtitle="최신 5개">
        <ul className="divide-y">
          {recentReviews.map((r) => (
            <li key={r.id} className="py-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    평점 {Number(r.rating ?? 0).toFixed(1)}
                  </div>
                  {r.text && (
                    <div className="text-sm text-gray-700 line-clamp-2">
                      {r.text}
                    </div>
                  )}
                </div>
                {r.toiletId && (
                  <Link
                    href={`/toilets/${r.toiletId}`}
                    className="text-blue-600 hover:underline"
                  >
                    상세보기
                  </Link>
                )}
              </div>
            </li>
          ))}
          {recentReviews.length === 0 && (
            <li className="py-4 text-gray-600">아직 작성한 리뷰가 없습니다.</li>
          )}
        </ul>
      </Card>

      {/* 즐겨찾기 */}
      <Card title="즐겨찾기" subtitle="빠른 이동">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {favorites.map((f) => (
            <li key={f.id} className="border rounded p-3">
              <div className="font-medium">{f.name ?? "이름 없음"}</div>
              <div className="text-sm text-gray-600">
                평점: {(f.avgRating ?? 0).toFixed(1)}
              </div>
              {f.toiletId && (
                <Link
                  href={`/toilets/${f.toiletId}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  이동
                </Link>
              )}
            </li>
          ))}
          {favorites.length === 0 && (
            <div className="text-gray-600">즐겨찾기한 화장실이 없습니다.</div>
          )}
        </ul>
      </Card>

      {/* 추천 */}
      <Card title="추천 장소" subtitle="평점 상위">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topRated.map((t) => (
            <li key={t.id} className="border rounded p-3">
              <div className="font-medium">{t.name ?? "이름 없음"}</div>
              <div className="text-sm text-gray-600">
                평점: {(t.avgRating ?? 0).toFixed(1)}
              </div>
              <Link
                href={`/toilets/${t.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                상세보기
              </Link>
            </li>
          ))}
          {topRated.length === 0 && (
            <div className="text-gray-600">표시할 항목이 없습니다.</div>
          )}
        </ul>
      </Card>
    </div>
  );
}
