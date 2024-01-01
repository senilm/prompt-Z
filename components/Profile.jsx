import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.length > 0 ?

        data?.map((prompt) => (
          <PromptCard
            {...prompt}
            key={prompt._id}
            handleEdit={() => handleEdit && handleEdit(prompt)}
            handleDelete={() => handleDelete && handleDelete(prompt)}
          />
        )) : <div className="orange_gradient text-xl">You have not posted any Prompts</div>}
      </div>
    </section>
  );
};

export default Profile;
