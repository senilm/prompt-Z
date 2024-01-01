import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className=" w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Discover & Share
        <br className="" />
        <span className=" orange_gradient text-center ">AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore neque a omnis, reiciendis ad, architecto maxime dolorem soluta ex ut sequi cupiditate natus possimus temporibus nam quia, voluptate blanditiis recusandae!
      </p>

      {/* feed */}
      <Feed/>
    </section>
  );
}
