import { PodcastGrid, Filters } from "../components/index";
import { Pagination } from "../UI/index";

export default function Home() {
  return (
    <>
      <Filters />
      <main>
        <PodcastGrid />
        <Pagination />
      </main>
    </>
  );
}