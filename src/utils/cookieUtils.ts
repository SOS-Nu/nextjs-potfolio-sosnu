export const setCookie = (name: string, value: string, days: number = 365) => {
  // Check an toàn để không chạy trên Server (tránh lỗi document is not defined)
  if (typeof document === "undefined") {
    console.log("⚠️ setCookie được gọi trên Server, bỏ qua.");
    return;
  }

  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  // Quan trọng: path=/ để cookie có hiệu lực toàn trang
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;

  console.log(`✅ Đã lưu Cookie: ${name} = ${value}`);
};

// Hàm getCookie ở client (dùng khi cần thiết, nhưng chủ yếu ta dùng Redux store)
export const getCookieClient = (name: string) => {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};
