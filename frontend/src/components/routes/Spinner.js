import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";

const CenteredSpinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Change to 100vh for full viewport height */
  background-color: #f5f5f5; /* Add a background color */
`;

const CountdownContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
`;

const CountdownText = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333; /* Change text color */
`;

const Spinner = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 2px solid #007bff; /* Change the spinner color */
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px;
`;

const App = ({path="login"}) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev - 1));
    }, 1000);
    if (count === 0) {
      navigate(`${path}`,{
        state:location.pathname
      });
    }
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate,location,path]);

  return (
    <CenteredSpinner>
      <CountdownContainer>
        <CountdownText>Redirecting in {count} seconds</CountdownText>
        <Spinner role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </CountdownContainer>
    </CenteredSpinner>
  );
};

export default App;
