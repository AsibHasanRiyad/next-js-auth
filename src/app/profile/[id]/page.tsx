import React from "react";

const userProfile = ({ params }: any) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className=" text-5xl">Profile ID {params.id}</h1>
    </div>
  );
};

export default userProfile;
 