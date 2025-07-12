import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  //check if the id is present or not
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  // Fetch user info using the user id
  const userInfo = await fetchUser(user.id);
  //if not present then redirect to onboarding page (means user is not onboarded)
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch the thread by its id from thread.actions.ts
  const thread = await fetchThreadById(params.id);

  return (
    <section className='relative'>
      <div>
        {/* //call ThreadCard componenet */}
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      {/* //call Comment component to show add comment written there with its profile photo*/}
      <div className='mt-7'>
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)} //we stringify it because the db automate id is in object form.
        />
      </div>

      {/* //call ThreadCard component to show the comments of that post*/}
      <div className='mt-10'>
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
