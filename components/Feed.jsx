"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import debounce from "lodash/debounce"; // Import lodash debounce
import CardSkeleton from "./CardSkeleton";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length > 0 ? (
        data.map((prompt) => (
          <PromptCard
            {...prompt}
            key={prompt._id}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <div className="">No Prompts Found</div>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchText) {
          const response = await fetch(`/api/prompt/fetch/${searchText}`);

          if (response.ok) {
            const data = await response.json();
            setFeedData(data);
            setIsLoading(false);
          } else {
            console.log(response.text);
          }
        } else {
          const response = await fetch("/api/prompt/fetch",{
            cache:'no-store'
          });

          if (response.ok) {
            const data = await response.json();
            setFeedData(data);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    // Use lodash's debounce function
    const debouncedFetchData = debounce(fetchData, 500);

    // Call debouncedFetchData on searchText change
    debouncedFetchData();

    // Cleanup function to clear the timeout when the component unmounts or when searchText changes
    return () => debouncedFetchData.cancel();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search Prompts Tag Here"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
      </form>
      {isLoading ? (
        <div className="mt-16 prompt_layout">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        </div>
      ) : (
        <PromptCardList data={feedData} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
