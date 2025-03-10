import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Notification } from "@mantine/core";
import "./Auth.css"

export const Auth = () => {
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveToken = () => {
    if (!token.trim()) {
      setError("API KEY tabilmadi");
      return;
    }
    
    localStorage.setItem("token", token);
    navigate("/categories");
  };

  return (
    <div className="wrapper">
      
      <Flex justify="center" h={400} mt={80}>
        <div className="auth">
          <h1>Avtorizaciya</h1>
          <input
            placeholder="API KEY"
            type="text"
            style={{ width: "100%", marginTop: "10px" }}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button color='yellow' onClick={saveToken} mt={20}>API KEY jiberiw</Button>
        </div>
      </Flex>
      {error && (
        <Notification color="red" withCloseButton onClose={() => setError(null)} w={500} ml='auto'>
          {error}
        </Notification>
      )}
    </div>
  );
};
