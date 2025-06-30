import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#121212",
        },
      }}
    />
  );
};

//  : "#121212"
//  : "#fff"
