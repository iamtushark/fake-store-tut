import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { generateKey } from "../../utils/generateKey";
import { RegisterForm } from "./Interfaces";
import SignupSchema from "./ValidationSchema";
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
import { addUser } from "../../utils/dbOperations/dbOperations";
import { localStorageKeys } from "../../utils/dbOperations/config";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(SignupSchema),
  });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterForm) => {
    const key = generateKey();
    try {
      const status = await addUser(data.username, data);
      console.log(status, "status");
      if (!status) {
        setError("User already exists, Try Logging in instead");
      }
      localStorage.setItem(localStorageKeys.user, data.username);
      dispatch(loginUser({ userId: data.username, password: data.password }));
      navigate("/");
    } catch (err: any) {
      // Handle error
    }
  };

  return (
    <CommonFormBox>
      <CommonContainer>
        <CommonCard>
          <CommonCardContent>
            <CommonHeadingTypography>Sign Up</CommonHeadingTypography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="username"
                    control={control}
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="email"
                    control={control}
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField name="name" control={control} label="Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="mobileNo"
                    control={control}
                    label="Phone Number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CardActions>
                    <CommonBlackSubmitButton
                      loading={isLoading}
                      text="Sign Up"
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

export default SignUp;
