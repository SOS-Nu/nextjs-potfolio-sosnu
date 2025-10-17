"use client";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useMemo, useRef } from "react";

interface IProps {
  animationPath: object;
  width?: string;
}
const AnimationLottie = ({ animationPath, width = "95%" }: IProps) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const defaultOptions = useMemo(() => {
    return {
      loop: true,
      autoplay: true,
      animationData: animationPath,
      style: {
        width,
      },
      lottieRef: lottieRef,
    };
  }, [animationPath, width]);

  useEffect(() => {
    // 2. Sửa cảnh báo về ref
    // Lưu giá trị của ref.current vào một biến tạm
    const lottieInstance = lottieRef.current;

    return () => {
      // Dùng biến tạm trong hàm dọn dẹp
      lottieInstance?.destroy();
    };
  }, []);

  return <Lottie {...defaultOptions} />;
};

export default AnimationLottie;
