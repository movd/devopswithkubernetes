import React from "react";

const Header: React.FC<{}> = () => {
  return (
    <header>
      <h2>
        Project for{" "}
        <a href="https://devopswithkubernetes.com/">DevOps with Kubernetes</a>{" "}
        by <a href="https://github.com/movd/">Moritz</a>
      </h2>
    </header>
  );
};

export default Header;
