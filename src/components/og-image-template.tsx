"use no memo";
import React from "react";

type OGImageTemplateProps = {
  title: string;
  description: string;
  logoBase64: string;
};

export const OGImageTemplate = ({ title, description, logoBase64 }: OGImageTemplateProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        padding: "60px 80px",
        backgroundColor: "#0b0d12",
        backgroundImage:
          "radial-gradient(circle at 95% 10%, rgba(4, 72, 255, 0.18) 0%, transparent 60%), radial-gradient(circle at 5% 90%, rgba(255, 92, 0, 0.18) 0%, transparent 60%)",
        color: "#ffffff",
        fontFamily: "Inter",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Top row: Brand header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Scan Now Logo"
            style={{ width: "56px", height: "56px", objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: "30px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-1px",
              color: "#ff5c00",
            }}
          >
            Scan Now
          </span>
        </div>
        <div
          style={{
            display: "flex",
            padding: "8px 16px",
            backgroundColor: "rgba(255, 92, 0, 0.1)",
            border: "1px solid rgba(255, 92, 0, 0.3)",
            borderRadius: "99px",
            color: "#ff5c00",
            fontSize: "14px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          F&B Ordering Platform
        </div>
      </div>

      {/* Middle row: Content and Logo Visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          marginTop: "20px",
          marginBottom: "20px",
          gap: "60px",
          width: "100%",
        }}
      >
        {/* Text column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "20px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "20px",
              lineHeight: 1.4,
              color: "#9ca3af",
              display: "flex",
            }}
          >
            {description}
          </div>
        </div>

        {/* Brand visual (right side big logo) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "220px",
            height: "220px",
            borderRadius: "32px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            position: "relative",
          }}
        >
          {/* Subtle background glow */}
          <div
            style={{
              position: "absolute",
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              backgroundColor: "#ff5c00",
              opacity: 0.15,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Scan Now"
            style={{ width: "140px", height: "140px", objectFit: "contain", zIndex: 2 }}
          />
        </div>
      </div>

      {/* Bottom row: Web address & badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "24px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
            color: "#6b7280",
            fontSize: "15px",
            fontWeight: 400,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: "#10b981",
              }}
            />
            <span>Setup 15 mins</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: "#10b981",
              }}
            />
            <span>QR Ordering</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: "#10b981",
              }}
            />
            <span>300,000+ Restaurants</span>
          </div>
        </div>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#ff5c00" }}>scannow.site</span>
      </div>
    </div>
  );
};
