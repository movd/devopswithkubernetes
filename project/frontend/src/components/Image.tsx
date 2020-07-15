import React from "react";

export interface ImageProps {
  url: string;
}

const Image: React.SFC<ImageProps> = ({ url }) => {
  return (
    <>
      <h3>Cached Image by Lorem Picsum</h3>
      <img src={url} alt="lorem picsum" width="50%" />
    </>
  );
};

export default Image;
