import React from "react";

const Home = ({ userId, setUserId }: any) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
      }}
    >
      <h1 style={{ color: "black" }}>Home</h1>
      <div>
        <div>user: {userId}</div>
        <button
          onClick={() =>
            setUserId((id: number) => {
              return id === 1 ? 0 : 1;
            })
          }
        >
          set user
        </button>
      </div>
    </div>
  );
};

export default Home;
