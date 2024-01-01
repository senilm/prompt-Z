"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import debounce from "lodash/debounce"; // Import lodash debounce
import CardSkeleton from "./CardSkeleton";
import { revalidatePath } from "next/cache";

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
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt/fetch",{
      cache:'no-store'
    });
    const data = await response.json();

    setAllPosts(data);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchPosts()
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


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
        <>
        {searchText ? (
          <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          />
          ) : (
            <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
            )}
          </>
      )}
    </section>
  );
};

export default Feed;
