import { FC } from "react";
import { Box, Skeleton, SxProps, Theme, Typography } from "@mui/material";

type UserSkeletonProps = {
  sx?: SxProps<Theme>;
};

const UserSkeleton: FC<UserSkeletonProps> = ({ sx = {} }) => {
  const skeletonStyle: SxProps<Theme> = {
    bgcolor: "rgba(255, 180, 120, 0.15)", // base beige-orange
    position: "relative",
    overflow: "hidden",

    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      transform: "translateX(-100%)",
      background: `linear-gradient(
        90deg,
        transparent,
        rgba(255, 200, 150, 0.35),
        transparent
      )`,
      animation: "shimmer 1.6s infinite",
    },

    "@keyframes shimmer": {
      "100%": {
        transform: "translateX(100%)",
      },
    },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={sx}
    >
      {/* Head */}
      <Skeleton
        variant="circular"
        width={90}
        height={90}
        sx={skeletonStyle}
      />

      {/* Neck */}
      <Skeleton
        variant="rectangular"
        width={30}
        height={20}
        sx={{ ...skeletonStyle, mt: 1, borderRadius: 2 }}
      />

      {/* Shoulders */}
      <Skeleton
        variant="rounded"
        width={200}
        height={100}
        sx={{
          ...skeletonStyle,
          mt: 1,
          borderRadius: "100px 100px 20px 20px",
        }}
      />
      <span style={{fontSize:"xx-large",fontFamily:"serif",fontWeight:"bolder",paddingBlock:"10px",color:"rgb(222 184 135)"}}>
        Loading 3-D Model...
      </span>
    </Box>
  );
};

export default UserSkeleton;