const AppFooter = () => {
  return (
    <div className="text-center my-3">
      Copyright © {new Date().getFullYear()} Lê Văn Nguyên (SOS Nu).{" "}
      <span
        style={{
          color: "#e25555",
        }}
      >
        ♥
      </span>{" "}
      Gmail: levannguyen260901@gmail.com
    </div>
  );
};

export default AppFooter;
