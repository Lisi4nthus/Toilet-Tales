"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

export default function Map({
  markers = [],
  initialCenter = [37.5665, 126.978],
  initialZoom = 13,
  className = "h-[420px] w-full",
}) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [scriptReady, setScriptReady] = useState(false);

  // 이미 스크립트가 로드된 경우 대비
  useEffect(() => {
    if (typeof window !== "undefined" && window.naver?.maps) {
      setScriptReady(true);
    }
  }, []);

  // 초기 위치를 사용자 현재 위치로 보정
  useEffect(() => {
    if (!navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapRef.current && window.naver?.maps) {
          const center = new window.naver.maps.LatLng(latitude, longitude);
          mapRef.current.setCenter(center);
        }
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  // 스크립트가 로드되면 지도 생성
  useEffect(() => {
    if (!scriptReady) return;
    if (!mapRef.current && mapDivRef.current && window.naver?.maps) {
      mapRef.current = new window.naver.maps.Map(mapDivRef.current, {
        center: new window.naver.maps.LatLng(
          initialCenter[0],
          initialCenter[1]
        ),
        zoom: initialZoom,
      });
    }
  }, [scriptReady, initialCenter, initialZoom]);

  // 마커 동기화
  useEffect(() => {
    if (!mapRef.current || !window.naver?.maps) return;
    // 기존 마커 제거
    markersRef.current.forEach((mk) => mk.setMap(null));
    markersRef.current = [];
    // 새 마커 추가
    markers.forEach((m) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(m.lat, m.lng),
        map: mapRef.current,
        title: m.name,
      });
      if (m.name || m.rating != null) {
        const content = `
          <div style="padding:6px 8px;">
            <div style="font-weight:600;">${m.name ?? ""}</div>
            ${m.rating != null ? `<div style="font-size:12px;color:#555;">평점: ${Number(m.rating).toFixed(1)}</div>` : ""}
          </div>`;
        const info = new window.naver.maps.InfoWindow({ content });
        window.naver.maps.Event.addListener(marker, "click", () => {
          info.open(mapRef.current, marker);
        });
      }
      markersRef.current.push(marker);
    });
  }, [markers]);

  return (
    <div className={className}>
      {!NAVER_CLIENT_ID && (
        <div className="text-sm text-red-600 mb-2">
          환경변수 NEXT_PUBLIC_NAVER_CLIENT_ID가 설정되지 않았습니다.
        </div>
      )}
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID || ""}`}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div ref={mapDivRef} className="h-full w-full" />
    </div>
  );
}
