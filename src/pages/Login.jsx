// src/pages/LoginPage.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8080/login", {
                name,
                password,
            });

            console.log("✅ login response:", res.data);

            // ✅ 핵심 수정
            login({
                id: res.data.user.userId,
                name: res.data.user.name,
                gender: res.data.user.gender,
            });

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("로그인 실패");
        }
    };

  return (
    <AuthLayout>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.9)",
          boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
        }}
      >
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 3,
            p: { xs: 3, sm: 4 },
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              로그인
            </Typography>

            <TextField
              label="아이디"
              required
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="비밀번호"
              type="password"
              required
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              로그인
            </Button>

            <Box
              sx={{
                mt: 2.5,
                display: "flex",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                아직 계정이 없나요?
              </Typography>
              <Typography
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "primary.main",
                }}
              >
                회원가입
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default LoginPage;
