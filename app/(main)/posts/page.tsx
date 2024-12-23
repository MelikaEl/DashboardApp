import PostsTable from "@/components/posts/PostsTable";
import BackButton from "@/components/BackButton";
import PostsPagination from "@/components/posts/PostsPagination";
import CreatePostButton from "@/components/CreatePostButton";

const PostsPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />

      <div className="flex justify-between items-center ">
        <h3 className="text-2xl mb-4 dark:text-pink-300">Posts</h3>
        <CreatePostButton link="/posts/create"/>
      </div>
      <PostsTable />
      <PostsPagination />
    </>
  );
};

export default PostsPage;
