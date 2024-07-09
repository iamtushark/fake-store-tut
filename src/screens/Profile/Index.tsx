import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getEntryById } from "../../utils/dbOperations/dbOperations";
import useRegister from "../../hooks/useRegister";
import { userInfo } from "../../utils/dbOperations/interfaces";
import { getLoggedInUserInfo } from "../../utils/dbOperations/dbOperations";
import ProfileSchema from "./ValidationSchema";
import CommonBlackSubmitButton from "../../Components/Common/CommonBlackSubmitButton";
import CommonTextField from "../../Components/Common/CommonTextField";
import CommonCard from "../../Components/Common/CommonCard";
import CommonCardContent from "../../Components/Common/CommonCardContent";
import CommonFormBox from "../../Components/Common/CommonFormBox";
import CommonContainer from "../../Components/Common/CommonContainer";
import CommonErrorTypography from "../../Components/Common/CommonErrorTypography";
import CommonHeadingTypography from "../../Components/Common/CommonHeadingTypography";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register: updateProfile, loading, error } = useRegister("update");
  const { control, handleSubmit, reset } = useForm<userInfo>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: { mobileNo: 0, name: " ", email: " ", password: " " },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getEntryById(id as string);
        if (userData) {
          reset(userData);
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = async (data: userInfo) => {
    try {
      await updateProfile(data, undefined, id);
      const user = await getLoggedInUserInfo();
      if (user?.authLevel === "admin") {
        navigate("/user-list");
      } else if (user?.authLevel === "users") {
        navigate(`/profile/${user.id}`);
      }
    } catch (error) {}
  };

  return (
    <CommonFormBox>
      <CommonContainer>
        <CommonCard>
          <CommonCardContent>
            <CommonHeadingTypography>Edit Profile</CommonHeadingTypography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="email"
                    control={control}
                    label="Email"
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
                      loading={loading}
                      text="Save Changes"
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

export default ProfilePage;
