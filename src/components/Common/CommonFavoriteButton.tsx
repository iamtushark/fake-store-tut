import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

const StyledFavoriteIcon = styled(FavoriteIcon)<{ isFavorite: boolean }>(
  ({ isFavorite, theme }) => ({
    color: isFavorite ? theme.palette.primary.main : theme.palette.grey[500],
  }),
);

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
}) => {
  return (
    <IconButton aria-label="add to favorites" onClick={onClick}>
      <StyledFavoriteIcon isFavorite={isFavorite} />
    </IconButton>
  );
};

export default FavoriteButton;
