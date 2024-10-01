import React, { useRef, useState } from "react";
import { Input, Button, Spin, Card, Typography } from "antd";
import openai from "../utils/openapi";
import ReactMarkDown from "react-markdown";

const AISearch = () => {
  const searchText = useRef();
  const [searchResults, setSearchResults] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAISearch = async () => {
    const prompt = `Act as a search engine and provide the best answer to the following question: ${searchText.current.input.value}`;
    console.log(searchText.current.input.value);
    try {
      setLoading(true);
      setError(null);
      const gptResult = await openai.generateContent(prompt);
      const response = gptResult.response;
      const text = response.text();

      if (!text) {
        return;
      }

      setSearchResults(text);

      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-5 w-75">
      <h2 className="text-center">AI SEARCH</h2>
      <div className="d-flex">
        <Input
          placeholder="Search here"
          ref={searchText}
          style={{ width: "calc(100% - 120px)" }}
        />
        <Button type="primary" onClick={handleAISearch}>
          Search
        </Button>
      </div>

      {loading ? (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        searchResults && (
          <Card bordered={true} style={{ marginTop: "20px" }}>
            <Typography>
              <Typography.Paragraph>
                <ReactMarkDown>{searchResults}</ReactMarkDown>
              </Typography.Paragraph>
            </Typography>
          </Card>
        )
      )}
    </div>
  );
};

export default AISearch;
