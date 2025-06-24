

import Container from "@/components/container/container";

import { SpinLoader } from "@/components/SpinLoad/SpinLoader";
import { Suspense } from "react";

export default function Home() {
  return (
    <div >
      <Suspense fallback={<SpinLoader />}>
        <Container />
        {/* <PostList /> */}
      </Suspense>
    </div>
  );
}
