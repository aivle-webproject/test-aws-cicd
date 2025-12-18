import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)", // 헤더 제외 전체 높이
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        {children}
      </Container>
    </Box>
  );
}

export default AuthLayout;
