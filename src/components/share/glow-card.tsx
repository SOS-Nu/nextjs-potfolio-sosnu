// GlowCard.tsx

import { useEffect } from "react";
import "./glow-card.scss";

interface IProps {
  children: React.ReactNode;
  identifier: string;
  // Thêm prop autoRotate (tùy chọn)
  autoRotate?: boolean;
  spread?: number;
  proximity?: number;
}

const GlowCard = ({
  children,
  identifier,
  autoRotate = false,
  spread,
  proximity,
}: IProps) => {
  useEffect(() => {
    const CONTAINER = document.querySelector(
      `.glow-container-${identifier}`
    )! as HTMLElement;
    const CARDS = document.querySelectorAll(
      `.glow-card-${identifier}`
    )! as NodeListOf<HTMLElement>;

    const CONFIG = {
      proximity: proximity ?? 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
      speed: 1,
    };

    const RESTYLE = () => {
      CONTAINER.style.setProperty("--gap", "" + CONFIG.gap);
      CONTAINER.style.setProperty("--blur", "" + CONFIG.blur);
      CONTAINER.style.setProperty("--spread", "" + CONFIG.spread);
      CONTAINER.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row"
      );
    };

    RESTYLE();

    let cleanupFunction = () => {};

    // --- Logic Tự động Quay (Auto Rotate Logic) ---
    // --- Logic Tự động Quay (Đơn giản và Chính xác) ---
    if (autoRotate) {
      let startAngle = 0;
      let animationFrameId: number;

      const ANIMATE = () => {
        // Đơn giản chỉ cần tăng góc và áp dụng cho tất cả các card
        startAngle = (startAngle + CONFIG.speed) % 360;

        for (const CARD of CARDS) {
          // Luôn bật viền và cập nhật góc quay
          CARD.style.setProperty("--active", "1");
          // --start là biến mà CSS đang dùng trong mask để tạo hiệu ứng quay
          CARD.style.setProperty("--start", `${startAngle}`);
        }

        animationFrameId = requestAnimationFrame(ANIMATE);
      };

      animationFrameId = requestAnimationFrame(ANIMATE);
      cleanupFunction = () => cancelAnimationFrame(animationFrameId);
    }
    // --- Logic Di chuột (Pointer Move Logic) ---
    else {
      const UPDATE = (event: PointerEvent) => {
        for (const CARD of CARDS) {
          const CARD_BOUNDS = CARD.getBoundingClientRect();

          // Kiểm tra xem con trỏ có ở gần thẻ không (proximity check)
          if (
            event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
            event?.x <
              CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
            event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
            event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
          ) {
            CARD.style.setProperty("--active", "1");
          } else {
            CARD.style.setProperty("--active", "" + CONFIG.opacity);
          }

          // Tính toán góc dựa trên vị trí chuột
          const CARD_CENTER = [
            CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
            CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
          ];

          let ANGLE =
            (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
              180) /
            Math.PI;

          ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

          CARD.style.setProperty("--start", "" + (ANGLE + 90));
        }
      };

      // Bắt đầu lắng nghe sự kiện chuột và thiết lập cleanup
      document.body.addEventListener("pointermove", UPDATE);
      cleanupFunction = () =>
        document.body.removeEventListener("pointermove", UPDATE);
    }

    // Cleanup function
    return cleanupFunction;
  }, [identifier, autoRotate, , proximity, spread]); // Thêm autoRotate vào dependency array

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article className={`glow-card glow-card-${identifier}`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
