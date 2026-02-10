import { PodcastGrid, Filters } from "../components/index";
import { Pagination } from "../UI/index";
import RecommendationCarousel from "../components/RecommendationCarousel";
import { usePodcasts } from "../context/PodcastContext";




export default function Home() {
   const { podcasts } = usePodcasts();
  return (
    <>
      <Filters />
      <main>
        <RecommendationCarousel shows={podcasts} />
        <PodcastGrid />
        <Pagination />
      </main>
    </>
  );
}