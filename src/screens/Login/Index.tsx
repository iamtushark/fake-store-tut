import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import { LoginFormInterface } from "./Interfaces";
import LoginFormSchema from "./ValidationSchema";
import CommonBlackSubmitButton from "../../components/Common/CommonBlackSubmitButton";
import CommonTextField from "../../components/Common/CommonTextField";
import CommonCard from "../../components/Common/CommonCard";
import CommonCardContent from "../../components/Common/CommonCardContent";
import CommonFormBox from "../../components/Common/CommonBox";
import CommonContainer from "../../components/Common/CommonContainer";
import CommonErrorTypography from "../../components/Common/CommonErrorTypography";
import CommonHeadingTypography from "../../components/Common/CommonHeadingTypography";
import { loginUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { logUser } from "../../utils/dbOperations/dbOperations";
import { localStorageKeys } from "../../utils/dbOperations/config";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInterface>({
    resolver: yupResolver(LoginFormSchema),
  });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInterface) => {
    try {
      const loginStatus = await logUser(data.username, data.password);
      if (loginStatus) {
        dispatch(loginUser({ userId: data.username, password: data.password }));
        localStorage.setItem(localStorageKeys.user, data?.username);
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {}
  };

  return (
    <CommonFormBox>
      <CommonContainer>
        <CommonCard>
          <CommonCardContent>
            <CommonHeadingTypography>Login</CommonHeadingTypography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CommonTextField
                    name="username"
                    control={control}
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CommonTextField
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CardActions>
                    <CommonBlackSubmitButton
                      loading={isLoading}
                      text="Log In"
                    />
                  </CardActions>
                </Grid>
              </Grid>
            </Box>
            {error && <CommonErrorTypography>{error}</CommonErrorTypography>}
          </CommonCardContent>
        </CommonCard>
      </CommonContainer>
    </CommonFormBox>
  );
};

export default LoginPage;
