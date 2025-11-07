import { Skeleton } from "@mui/material";
import "./UserSkeleton.scss";

const UserSkeleton = () => {
  return (
    <div className="user-skeleton">
      {/* Summary skeletons */}
      <div className="user-skeleton__summary">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="user-skeleton__card">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={160}
              sx={{ borderRadius: "4px" }}
              animation="wave"
            />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="user-skeleton__table">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={50}
            sx={{ marginBottom: "8px" }}
            animation="wave"
          />
        ))}
      </div>
    </div>
  );
};

export default UserSkeleton;
