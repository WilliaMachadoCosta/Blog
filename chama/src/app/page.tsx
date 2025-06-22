
import Body from "@/components/body/body";
import { PostList } from "@/components/postsList";
import { SpinLoader } from "@/components/SpinLoad/SpinLoader";
import { Suspense } from "react";

export default function Home() {
  return (
    <div >
      <Suspense fallback={<SpinLoader />}>
        <Body />
        <PostList />
      </Suspense>

    </div>
  );
}
