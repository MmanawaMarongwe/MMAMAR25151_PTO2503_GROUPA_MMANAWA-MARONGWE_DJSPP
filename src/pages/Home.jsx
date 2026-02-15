import { PodcastGrid, Filters } from "../components/index";
import { Pagination } from "../UI/index";
import RecommendationCarousel from "../components/RecommendationCarousel";
import { usePodcasts } from "../context/PodcastContext";




export default function Home() {
   const { podcasts, allPodcasts } = usePodcasts();

  return (
    <>
      <Filters />
      <main>
        <RecommendationCarousel
            shows={allPodcasts}
            excludeIds={podcasts.map((p) => String(p.id))}
        />
        <PodcastGrid />
        <Pagination />
      </main>
    </>
  );
}