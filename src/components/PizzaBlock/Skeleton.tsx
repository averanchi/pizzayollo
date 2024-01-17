import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="138" cy="138" r="125" />
    <rect x="0" y="281" rx="11" ry="11" width="280" height="19" />
    <rect x="2" y="317" rx="10" ry="10" width="272" height="88" />
    <rect x="0" y="428" rx="11" ry="11" width="95" height="30" />
    <rect x="119" y="428" rx="28" ry="28" width="152" height="45" />
  </ContentLoader>
);
